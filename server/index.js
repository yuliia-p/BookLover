require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const argon2 = require('argon2');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(staticMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/users/sign-up', (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    throw new ClientError(400, 'username, email and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "email", "hashedPassword")
        values ($1, $2, $3)
        returning *
      `;
      const params = [username, email, hashedPassword];

      db.query(sql, params)
        .then(result => {
          const [userId] = result.rows;
          res.status(201).json(userId);
        });
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
          "hashedPassword",
          "email"
    from "users"
    where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword, email } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/saved-books/', (req, res, next) => {
  const { title, authors, imageLink, shortDescription, description, buyLink, averageRating, isbn10, categories, userId } = req.body;
  if (!title || !authors || !imageLink || !isbn10 || !userId) {
    throw new ClientError(400, 'missing info');
  }
  const insertBookSql = `
    insert into "books" ("title", "authors", "imageLink", "shortDescription", "description", "buyLink", "averageRating", "isbn10", "categories")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *
  `;
  const params = [title, authors, imageLink, shortDescription, description, buyLink, averageRating, isbn10, categories];
  db.query(insertBookSql, params)
    .then(result => {
      const book = result.rows[0];
      const bookId = book.bookId;
      const insertUserBookSql = `
    insert into "usersAddedBooks" ("userId", "bookId")
    values ($1, $2)
    on conflict ("userId", "bookId")
    do nothing
    returning *
  `;
      const insertUserBookParams = [userId, bookId];
      return db.query(insertUserBookSql, insertUserBookParams)
        .then(result => {
          const data = result.rows[0];
          res.status(201).json(data);
        });
    })
    .catch(err => next(err));
});

app.get('/api/saved-books/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(401, 'invalid user id');
  }
  // select book id where userid $
  const sql = `
    select *
    from "books"
    join "usersAddedBooks" using ("bookId")
    where "userId" = $1
  `;
  const params = [userId];
  return db.query(sql, params)
    .then(result => {
      const data = result.rows;
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/books/:bookId', (req, res, next) => {
  const bookId = Number(req.params.bookId);
  if (!bookId) {
    throw new ClientError(401, 'invalid book id');
  }
  const sql = `
    select *
    from "books"
    where "bookId" = $1
  `;
  const params = [bookId];
  return db.query(sql, params)
    .then(result => {
      const data = result.rows[0];
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.delete('/api/delete-books/:bookId', (req, res, next) => {
  const bookId = Number(req.params.bookId);
  if (!bookId) {
    throw new ClientError(401, 'invalid book id');
  }
  const sql = `
    delete from "usersAddedBooks"
    where "bookId" = $1;
  `;
  const params = [bookId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows[0];
      res.status(204).json(data);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
