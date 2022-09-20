import React from 'react';
import ShowRating from './show-rating';

export default class MoreDetailsMybooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { book: {} };
  }

  componentDidMount() {
    const { bookId } = this.props;
    fetch(`/api/books/${Number(bookId)}`, Request)
      .then(response => response.json())
      .then(data => this.setState({ book: data }))
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { book } = this.state;
    const { author, averageRating, category, description, imageLink, title } = book;
    return (
      <>
        <div className='container full-description'>
          <img className='more-details-img' src={imageLink} alt='pic' />
          <div className='content-holder-more-details'>
            <p className='number-of-weeks'> WEEKS ON THE LIST</p>
            <h2 className='title-more-details no-padding '>{title}</h2>
            <p className='author'>by {author}</p>
            <div className='rating no-margin'>
              {ShowRating(averageRating)}
              <p className='rating no-margin'>Rating: {averageRating}</p>
            </div>
            <p className='full-description description no-padding'>{description}</p>
            <p className='no-margin genres'>GENRES</p>
            <p className='no-margin genre-name'>{category}</p>
            <p>{this.props.buyLink}</p>
          </div>
        </div>
        <div className='add-button-holder'>
          <button className='add-button'>GET A Copy</button>
        </div>
      </>
    );
  }
}
