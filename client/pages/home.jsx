import React from 'react';
import BookList from '../components/books-list';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data => this.setState({ books: data.results.books }))
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      const url = `https://api.nytimes.com/svc/books/v3/lists/current/${this.props.category}.json?api-key=${process.env.BOOKS_API_KEY}`;
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
            books: data.results.books
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    const { books } = this.state;
    return (
      <BookList books={books} />
    );
  }
}
