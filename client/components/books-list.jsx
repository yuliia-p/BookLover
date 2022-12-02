import React from 'react';
import Book from './book-component';

export default function BookList(props) {
  if (!props.books) return;
  return (
      <ul>
        {
          props.books
            .filter(book => book.isbns.length > 0)
            .map(book => <Book key={book.title} book={book} />)
        }
      </ul>
  );
}

function BookListCarousel(props) {
  const book = props.books.map(book => {
    return (
      <div key={book.title}>
        <div style={{ padding: 8 }}>
          <Book key={book.title} book={book} />
        </div>
      </div>
    );
  });
  return book;
}
export { BookListCarousel, BookList };
