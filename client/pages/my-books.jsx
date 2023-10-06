import React from 'react';
import AppContext from '../lib/app-context';

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('book-lover-jwt');
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
    const { user } = this.context;
    return (
          <div className='container'>
        <h3>Welcome, {user.username}</h3>
        {
          books.length > 0
            ? (
              <ul>
                {books.map(book => <MyBook key={book.bookId} book={book} />)}
              </ul>
              )
            : (
              <p style={{ margin: '2rem 0' }}>Your saved books collection is currently empty.</p>
              )
        }
           </div>
    );
  }
}
MyBooks.contextType = AppContext;

function MyBook(props) {
  const {
    title, authors, imageLink,
    // shortDescription,
    bookId,
    // description,
    weeks
  } = props.book;
  // let cutDescription;
  // if (shortDescription === '') {
  //   cutDescription = description.split(' ', 24).join().replaceAll(',', ' ');
  // } else {
  //   cutDescription = shortDescription;
  // }
  return (
    <a href={`#my-book-details?bookId=${bookId}`} className='flex margin-top a-book'>
      <li onClick={props.onClick} className='flex margin-top'>
        <img className='book-list-img' src={imageLink} alt={title} />
        <div className='content-holder'>
          {
            weeks && <p className='number-of-weeks'>{weeks} WEEKS ON THE LIST</p>
          }
          <p className='title margin-top'>{title.toUpperCase()}</p>
          <p className='author margin-top'><span style={{ fontWeight: '100' }}>by </span>{authors}</p>
          {/* <p className='description margin-top'>{cutDescription}</p> */}
        </div>
      </li>
    </a>
  );
}
