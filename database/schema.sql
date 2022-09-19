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
	"buyLink" TEXT,
	"averageRating" numeric,
	"isbn10" numeric NOT NULL,
	"category" TEXT,
	CONSTRAINT "books_pk" PRIMARY KEY ("bookId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersAddedBooks" (
	"userId" int NOT NULL,
	"bookId" int NOT NULL,
  UNIQUE ("userId", "bookId"),
	"addedAt" timestamptz(6) NOT NULL default now()
) WITH (
  OIDS=FALSE
);





ALTER TABLE "addedBooks" ADD CONSTRAINT "addedBooks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "addedBooks" ADD CONSTRAINT "addedBooks_fk1" FOREIGN KEY ("bookId") REFERENCES "books"("bookId");
