import React from 'react';
import AppContext from '../lib/app-context';
import ShowRating from '../components/show-rating';
import LoadingSpinner from '../components/loading-spinner';
// import NotFound from './not-found';

export default class MoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      addedBook: {},
      isLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // console.log('this.props.author', this.props.author);
    let authorToSerach;
    if (this.props.author !== 'Magazine' || this.props.author !== 'Unkown') {
      // console.log('say hi');
      authorToSerach = this.props.author.slice(3).replaceAll(' ', '+');
    } else {
      authorToSerach = this.props.author;
    }
    const titleToSearch = this.props.title.replaceAll("'", '+').replaceAll(' ', '+');
    // console.log('titleToSearch', titleToSearch);
    // console.log('authorToSerach', authorToSerach);
    // ASK TIM
    // multyple authors
    if (authorToSerach === 'Unkown' || authorToSerach === 'Magazine' || authorToSerach.includes(',')) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${titleToSearch}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const req = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      fetch(url, req)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          this.setState({
            book: data.items[0],
            isLoading: false
          });
        })
        .catch(error => {
          console.error('Error:', error);
          this.setState({ isLoading: false });
        });
    }
    if (authorToSerach && titleToSearch) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${titleToSearch}+inauthor:${authorToSerach}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const req = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      fetch(url, req)
        .then(response => response.json())
        .then(data => {
          // SHOW TO TIM
          if (data.totalItems === 0) {
            this.setState({
              book: data.totalItems,
              isLoading: false
            });
          } else {
            this.setState({
              book: data.items[0],
              isLoading: false
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.setState({ isLoading: false });
        });
    } else {
      const urlisbn = `https://www.googleapis.com/books/v1/volumes?q=isbn${this.props.isbn}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const request = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      fetch(urlisbn, request)
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
                    book: data.items[0],
                    isLoading: false
                  });
                } else {
                  window.location.hash = 'not-found';
                }
              });
          } else {
            this.setState({
              book: data.items[0],
              isLoading: false
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.setState({ isLoading: false });
        });
    }
  }

  handleClick() {
    const { user, showModal } = this.context;
    const { volumeInfo, searchInfo } = this.state.book;
    const { title, description, averageRating, industryIdentifiers, imageLinks } = volumeInfo;
    const isnb = industryIdentifiers.find(i => i.type === 'ISBN_10');
    if (!user) {
      showModal();
    } else {
      const token = window.localStorage.getItem('react-context-jwt');
      let bookCover;
      if (this.props.url) {
        bookCover = this.props.url;
      } else if (!this.props.url) {
        bookCover = imageLinks.thumbnail;
      } else {
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
        categories = categories.join();
      }
      const objToSend = {
        title,
        authors: this.props.author,
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
          'X-Access-Token': `${token}`
        },
        body: JSON.stringify(objToSend)
      };
      fetch('/api/saved-books/', req)
        .then(window.location.hash = 'my-books')
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    // ASK TO TIM
    // if book not found => Loading

    // if (this.state.book === 0) return <NotFound />;
    if (!this.state.book) return <LoadingSpinner />;

    const { volumeInfo } = this.state.book;
    const { imageLinks, title, description, averageRating, categories } = volumeInfo;
    let coverToShow = this.props.url;
    if (!coverToShow) {
      coverToShow = imageLinks.thumbnail;
    }
    return (
      <>
        <div className='container full-description'>
          <img className='more-details-img' src={coverToShow} alt='pic' />
          <div className='content-holder-more-details'>
               { this.props.number &&
                <p className='number-of-weeks'>{this.props.number} WEEKS ON THE LIST</p>
                }
              <h2 className='title-more-details no-padding '>{title}</h2>
              <p className='author'>{this.props.author}</p>
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
          <div className='border'></div>
        </div>

      </>
    );
  }
}

MoreDetails.contextType = AppContext;
