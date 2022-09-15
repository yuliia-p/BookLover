import React from 'react';
import ShowRating from '../components/rating';

export default class MoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null
    };
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
      .then(data => {
        this.setState({
          book: data.items[0].volumeInfo
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    if (!this.state.book) return null;
    const author = this.state.book.authors[0];
    const genres = this.state.book.categories;
    const { description, averageRating, title } = this.state.book;
    return (
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
          <p className='no-margin genre-name'>{genres}</p>
        </div>
      </div>
    );
  }

}
