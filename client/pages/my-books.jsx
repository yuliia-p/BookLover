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
    const { user } = this.context;
    fetch(`/api/saved-books/${user.userId}`, Request)
      .then(response => response.json())
      .then(data =>
        this.setState({ books: data })
      )
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
  const { title, author, imageLink, shortDescription, bookId } = props.book;
  return (
    <a href={`#my-book-details?bookId=${bookId}`} className='flex margin-top a-book'>
      <li onClick={props.onClick} className='flex margin-top'>
        <img src={imageLink} alt={title} />
        <div className='content-holder'>
          <p className='title margin-top'>{title}</p>
          <p className='author margin-top'>by {author}</p>
          <p className='description margin-top'>{shortDescription}</p>
          <p className='more-details-p'>More Details...</p>
        </div>
      </li>
    </a>
  );
}
// data id ?
