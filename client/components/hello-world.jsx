import React from 'react';
import BookList from '../components/books-list';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=oN0z6slOegD5zjvuGpGHt1uNGJS1uEGE';
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data =>
      // console.log('data.results.books', data.results.books)

        this.setState({
          books: data.results.books
        })
      )
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <BookList books={this.state.books} />
    );
  }
}
