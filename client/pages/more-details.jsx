import React from 'react';
import AppContext from '../lib/app-context';
import ShowRating from './show-rating';

export default class MoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      addedBook: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn10-${this.props.isbn}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      // keep an eye on data from google
      // search NOT working properly Need filter and error
      .then(data => {
        const bookObject = {
          title: data.items[0].volumeInfo.title,
          author: data.items[0].volumeInfo.authors[0],
          imageLink: data.items[0].volumeInfo.imageLinks.thumbnail,
          shortDescription: data.items[0].searchInfo.textSnippet,
          description: data.items[0].volumeInfo.description,
          buyLink: data.items[0].saleInfo.buyLink, // check later for other books
          averageRating: data.items[0].volumeInfo.averageRating,
          isbn10: data.items[0].volumeInfo.industryIdentifiers[0].identifier,
          category: data.items[0].volumeInfo.categories[0]
        };
        this.setState({
          book: bookObject
        });

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleClick() {
    const { user, showhModal } = this.context;
    const { title, author, shortDescription, description, buyLink, averageRating, isbn10, category } = this.state.book;
    if (!user) {
      showhModal();
    } else {
      const token = window.localStorage.getItem('react-context-jwt');
      const objToSend = {
        title,
        author,
        imageLink: this.props.url,
        shortDescription,
        description,
        buyLink,
        averageRating,
        isbn10,
        category,
        userId: user.userId
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(objToSend)
      };
      fetch('/api/saved-books/', req)
        .catch(error => {
          console.error('Error:', error);
        });
    }
    window.location.hash = 'my-books';
  }

  render() {
    if (!this.state.book) return null;
    const { description, averageRating, title, author, category } = this.state.book;
    return (
      <>
        <div className='container full-description'>
          <img className='more-details-img' src={this.props.url} alt='pic' />
          <div className='content-holder-more-details'>
            <p className='number-of-weeks'>{this.props.number} WEEKS ON THE LIST</p>
            <h2 className='title-more-details no-padding '>{title}</h2>
            <p className='author'>by {author}</p>
            <div className='rating no-margin'>
              {ShowRating(averageRating)}
              <p className='rating no-margin'>Rating: {averageRating}</p>
            </div>
            <p className='full-description description no-padding'>{description}</p>
            <p className='no-margin genres'>GENRES</p>
            <p className='no-margin genre-name'>{category}</p>
            <a href={this.props.buyLink}>{this.props.buyLink}</a>
          </div>
        </div>
        <div className='add-button-holder'>
          <button onClick={this.handleClick} className='add-button'>WANT TO READ</button>
        </div>
      </>
    );
  }
}

MoreDetails.contextType = AppContext;
