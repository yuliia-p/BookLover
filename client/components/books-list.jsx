import React from 'react';

function Book(props) {
  const imgageUrl = props.book.book_image;
  const numberWeeks = props.book.weeks_on_list;
  const isbn = props.book.isbns[0].isbn10;
  return (
      <a
        href={`#details?isbn=${isbn}&imageurl=${imgageUrl}&n=${numberWeeks}`}
      className='flex margin-top a-book'>
        <li className='flex margin-top'>
          <img src={imgageUrl} alt={props.book.title} />
          <div className='content-holder'>
            <p className='number-of-weeks '>{props.book.weeks_on_list} WEEKS ON THE LIST</p>
            <p className='title margin-top'>{props.book.title}</p>
            <p className='author margin-top'>by {props.book.author}</p>
            <p className='description margin-top'>{props.book.description}</p>
            <p href={`#details?isbn=${isbn}`} className='more-details-p'>More Details...</p>
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
