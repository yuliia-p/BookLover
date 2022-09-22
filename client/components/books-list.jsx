import React from 'react';

function Book(props) {
  const { description, title, author } = props.book;
  const imageLink = props.book.book_image;
  const buyLink = props.book.buy_links[0];
  const bookObj = {
    title,
    authors: author,
    imageLink,
    shortDescription: description,
    description,
    buyLink: props.book.amazon_product_url,
    isbn10: props.book.primary_isbn10
  };
  const numberWeeks = props.book.weeks_on_list;

  return (
      <a
      href={`#details?isbn=${bookObj.isbn10}&imageurl=${imageLink}&n=${numberWeeks}&buy=${buyLink}`}
      className='flex margin-top a-book'>
        <li className='flex margin-top'>
        <img src={imageLink} alt={props.book.title} />
          <div className='content-holder'>
          <p className='number-of-weeks '>{numberWeeks} WEEKS ON THE LIST</p>
          <p className='title margin-top'>{bookObj.title}</p>
          <p className='author margin-top'>by {bookObj.authors}</p>
          <p className='description margin-top'>{bookObj.shortDescription}</p>
          <p className='more-details-p'>More Details...</p>
          </div>
        </li>
      </a>
  );
}

export default function BookList(props) {
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
