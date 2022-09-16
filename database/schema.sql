set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."books" (
  "bookId" serial,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "imageLink" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "buyLink" TEXT NOT NULL,
  "averageRating" int NOT NULL,
  "isbn_10" int NOT NULL,
  "isbn_13" int NOT NULL,
  "category" TEXT NOT NULL,
  "buyUrl" TEXT NOT NULL,
  CONSTRAINT "books_pk" PRIMARY KEY ("bookId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."addedBooks" (
  "userId" int NOT NULL,
  "bookId" int NOT NULL,
  "addedAt" timestamptz NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "addedBooks" ADD CONSTRAINT "addedBooks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "addedBooks" ADD CONSTRAINT "addedBooks_fk1" FOREIGN KEY ("bookId") REFERENCES "books"("bookId");
