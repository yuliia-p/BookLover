import React from 'react';

function Book(props) {
  return (
    <li className='flex margin-top'>
      <img src={props.book.book_image} alt={props.book.title}/>
      <div className='content-holder'>
        <p className='number-of-weeks'>{props.book.weeks_on_list} WEEKS ON THE LIST</p>
        <a className='title margin-top '>{props.book.title}</a>
        <p className='author margin-top '>by {props.book.author}</p>
        <p className='description margin-top '>{props.book.description}</p>
        <a className='more-details'>More Details...</a>
      </div>

    </li>
  );
}
// function hello(title) {
//   console.log('Hello!');
// }
export default function BookList(props) {
  return (
    <ul>
      {

        props.books.map(book => {
          return (
            <Book key={book.title} book={book} />
          );
        })
      }
    </ul>
  );
}

// function getMoreDetails(title) {

//   // toLowercase and ' ' to +
//   const searchTitle = title.toLowerCase().replace(',', '').replace('.', '').split(' ').join('+');
//   // console.log('searchTitle', searchTitle);
//   // console.log('clicked title', title);

//   const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
//   const request = {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json'
//     }
//   };
//   fetch(url, request)
//     .then(response => response.json())
//     .then(data => {
//       console.log('data from Goggole Books', data);
//       // this.setState({
//       //   books: data.results.books,
//       //   isClicked: !this.state.isClicked
//       // });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
