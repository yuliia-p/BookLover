import React from 'react';

export default function Book(props) {
  const { description, title, author } = props.book;
  const imageLink = props.book.book_image;
  const buyLink = props.book.amazon_product_url;
  const bookObj = {
    title,
    authors: author,
    imageLink,
    shortDescription: description,
    description,
    buyLink,
    isbn10: props.book.primary_isbn10
  };
  const numberWeeks = props.book.weeks_on_list;

  return (
    <a
      href={`#details?isbn=${bookObj.isbn10}&author=${author}&title=${title}&imageurl=${imageLink}&n=${numberWeeks}&buy=${buyLink}`}
      className='flex margin-top a-book'>
      <li className='flex margin-top'>
        <img className='book-list-img' src={imageLink} alt={props.book.title} />
        <div className='content-holder'>
          <p className='number-of-weeks '>{numberWeeks} WEEKS ON THE LIST</p>
          <p className='title margin-top'>{bookObj.title}</p>
          <p className='author margin-top'><span style={{ fontWeight: '100' }}>by</span> {bookObj.authors}</p>
          <p className='description margin-top'>{bookObj.shortDescription}</p>
        </div>
      </li>
    </a>
  );
}
