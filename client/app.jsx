import React from 'react';
import Navbar from './components/Navbar';
import BookList from './components/books-list';
import parseRoute from './lib/parse-route';
import MoreDetails from '../client/pages/more-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      route: parseRoute(window.location.hash)
    };
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data =>
        this.setState({
          books: data.results.books
        })
      )
      .catch(error => {
        console.error('Error:', error);
      });
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

  }

  getList(category) {
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
          isClicked: !this.state.isClicked
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <div className='container'>
          <BookList books={this.state.books} />
        </div>
      );
    }
    if (route.path === 'details') {
      const isbn = route.params.get('isbn');
      const imgageUrl = route.params.get('imageurl');
      const numberWeeks = route.params.get('n');
      return <MoreDetails isbn={isbn} url={imgageUrl} number={numberWeeks}/>;
    }
  }

  render() {
    return (
      <>
        <Navbar onClick={this.getList}/>
        {this.renderPage()}

      </>
    );
  }

}
