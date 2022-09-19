import React from 'react';
import AppContext from '../lib/app-context';

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    };
  }

  componentDidMount() {
    // GET req for a books with userId
  }

  render() {
    return (
      <a href="#my-books">
        <h1>Hello My Books!</h1>
      </a>
    );
  }
}
MyBooks.contextType = AppContext;
