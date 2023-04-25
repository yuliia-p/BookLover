import React from 'react';
import Book from '../components/book-component';
import LoadingSpinner from '../components/loading-spinner';

export default class AllBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.loadBooks();
    }
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    this.setState({ isLoading: true });
    const category = this.props.category;
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${process.env.BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          books: data.results.books,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { books } = this.state;
    return (
      <>
        { books.length === 0
          ? <LoadingSpinner />
          : <AllBooksList books={books} />
        }
      </>
    );
  }
}
function AllBooksList(props) {

  return (
    <ul>
      {
        props.books
          .filter(book => book.isbns.length > 0)
          .map(book => <Book key={book.title} book={book} />
          )
      }
    </ul>
  );
}
