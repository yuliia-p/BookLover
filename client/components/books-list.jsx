import React from 'react';

function Book(props) {
  return (
    <li className='flex margin-top'>
      <img src={props.book.book_image} alt={props.book.title}/>
      <div className='content-holder'>
        <p className='number-of-weeks'>{props.book.weeks_on_list} WEEKS ON THE LIST</p>
        <h3 className='title margin-top '>{props.book.title}</h3>
        <p className='author margin-top '>by {props.book.author}</p>
        <p className='description margin-top '>{props.book.description}</p>
      </div>

    </li>
  );
}

export default function BookList(props) {
  return (
    <ul>
      {

        props.books.map(book => {
          return <Book key={book.title} book={book} />;
        })
      }
    </ul>
  );
}
