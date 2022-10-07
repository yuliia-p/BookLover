import React from 'react';
import AppContext from '../lib/app-context';

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${token}`
      }
    };
    fetch('/api/saved-books/', req)
      .then(response => response.json())
      .then(data => {
        this.setState({ books: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { books } = this.state;
    return (
      <div className='container'>
          <ul>
            {
            books.map(book => <MyBook key={book.bookId} book={book} />)
            }
          </ul>
      </div>

    );
  }
}
MyBooks.contextType = AppContext;

function MyBook(props) {
  const { title, authors, imageLink, shortDescription, bookId, description } = props.book;
  let cutDescription;
  if (shortDescription === '') {
    cutDescription = description.split(' ', 24).join().replaceAll(',', ' ');
  } else {
    cutDescription = shortDescription;
  }
  return (
    <a href={`#my-book-details?bookId=${bookId}`} className='flex margin-top a-book'>
      <li onClick={props.onClick} className='flex margin-top'>
        <img className='book-list-img' src={imageLink} alt={title} />
        <div className='content-holder'>
          <p className='title margin-top'>{title}</p>
          <p className='author margin-top'>by {authors}</p>
          <p className='description margin-top'>{cutDescription}</p>
          <p className='more-details-p'>More Details...</p>
        </div>
      </li>
    </a>
  );
}
