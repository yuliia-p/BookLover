import React from 'react';
import ShowRating from './show-rating';

export default class MoreDetailsMybooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { book: {} };
  }

  componentDidMount() {
    const { bookId } = this.props;
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${token}`
      }
    };
    fetch(`/api/books/${Number(bookId)}`, req)
      .then(response => response.json())
      .then(data => this.setState({ book: data }))
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { book } = this.state;
    const { author, averageRating, categories, description, imageLink, title, buyLink } = book;
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
            <p className='no-margin genre-name'>{categories}</p>
            <p>{this.props.buyLink}</p>
            <div className='my-buttons flex'>
                {buyLink !== null &&
                <div className='add-button-holder'>
                  <div className='a-button-holder'><a href={buyLink} className='buy-button'>GET A COPY</a></div>
                </div>}
                <div className='delete-button-holder'>
                  < button className="buy-button delete-button" onClick={this.props.onClick}>REMOVE</button>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
