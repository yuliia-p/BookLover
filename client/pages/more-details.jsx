import React from 'react';
import AppContext from '../lib/app-context';
import ShowRating from '../components/show-rating';

export default class MoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      addedBook: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn${this.props.isbn}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data => {
        if (data.totalItems === 0) {
          const urlisbn10 = `https://www.googleapis.com/books/v1/volumes?q=isbn10-${this.props.isbn}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
          const request = {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          };
          fetch(urlisbn10, request)
            .then(response => response.json())
            .then(data => {
              if (data.totalItems > 0) {
                this.setState({
                  book: data.items[0]
                });
              } else {
                window.location.hash = 'not-found';
              }
            });
        } else {
          this.setState({
            book: data.items[0]
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleClick() {
    const { user, showhModal } = this.context;
    const { volumeInfo, searchInfo } = this.state.book;
    const { title, authors, description, averageRating, industryIdentifiers, imageLinks } = volumeInfo;
    const isnb = industryIdentifiers.find(i => i.type === 'ISBN_10');
    if (!user) {
      showhModal();
    } else {
      // join() for authors
      const token = window.localStorage.getItem('react-context-jwt');
      let bookCover = this.props.url;
      if (!bookCover) {
        bookCover = imageLinks.thumbnail;
      } else if (!imageLinks.thumbnail) {
        bookCover = imageLinks.smallThumbnail;
      }
      let shortDescription;
      if (!searchInfo) {
        shortDescription = '';
      } else {
        shortDescription = searchInfo.textSnippet;
      }
      let categories = this.state.book.volumeInfo.categories;
      if (!categories) {
        categories = '';
      } else {
        categories = categories[0];
      }
      const objToSend = {
        title,
        authors: authors[0],
        imageLink: bookCover,
        shortDescription,
        description,
        buyLink: this.props.buyLink,
        averageRating,
        isbn10: isnb.identifier,
        categories,
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
    const { volumeInfo } = this.state.book;
    const { authors, imageLinks, title, description, averageRating, categories } = volumeInfo;
    let coverToShow = this.props.url;
    if (!coverToShow) {
      coverToShow = imageLinks.thumbnail;
    }
    return (
      <>
        <div className='container full-description'>
          <img className='more-details-img' src={coverToShow} alt='pic' />
          <div className='content-holder-more-details'>
              <p className='number-of-weeks'>{this.props.number} WEEKS ON THE LIST</p>
              <h2 className='title-more-details no-padding '>{title}</h2>
              <p className='author'>by {authors.join()}</p>
              <div className='rating no-margin'>
                {ShowRating(averageRating)}
                <p className='rating no-margin'>Rating: {averageRating}</p>
              </div>
              <p className='full-description description no-padding'>{description}</p>
              <p className='no-margin genres'>GENRES</p>
              <p className='no-margin genre-name'>{categories}</p>
               <div className='my-buttons flex'>
                  {this.props.buyLink &&
                <div className='a-button-holder'><a href={this.props.buyLink} className='buy-button'>GET A COPY</a></div>}
                <div className='buy-button-holder'><button onClick={this.handleClick} className='add-button'>WANT TO READ</button></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MoreDetails.contextType = AppContext;
