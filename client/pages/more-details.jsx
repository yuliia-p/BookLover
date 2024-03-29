import React from 'react';
import AppContext from '../lib/app-context';
import ShowRating from '../components/show-rating';
import LoadingSpinner from '../components/loading-spinner';
import NotFound from './not-found';

export default class MoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      addedBook: {},
      isLoading: true,
      isNotFound: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getBookByTitle(title) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const req = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, req)
      .then(response => response.json())
      .then(data => {
        const resultByTitle = data.items.filter(book => book.volumeInfo.title === this.props.title && book.volumeInfo.imageLinks);
        this.setState({
          book: resultByTitle[0],
          isLoading: false
        });
        if (!resultByTitle[0]) {
          this.getBookByAthorAndTitile();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ isLoading: false });
      });
  }

  getBookByISBN() {
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
                this.setState({ isNotFound: true });
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

  getBookByAthorAndTitile(title, author) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const req = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, req)
      .then(response => response.json())
      .then(data => {
        if (data.totalItems === 0) {
          this.getBookByTitle();
        }
        if (data.items[0].id) {
          const urlById = `https://www.googleapis.com/books/v1/volumes/${data.items[0].id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`;
          const reqById = {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          };
          fetch(urlById, reqById)
            .then(response => response.json())
            .then(dataById => {
              if (!dataById.volumeInfo.imageLinks) {
                this.getBookByTitle(dataById.volumeInfo.title);
              } else {
                this.setState({
                  book: dataById,
                  isLoading: false
                });
              }
            })
            .catch(error => {
              console.error('Error:', error);
              this.setState({ isLoading: false });
            });
        } else {
          this.setState({
            book: data.items[0],
            isLoading: false
          });
        }
      }
      )
      .catch(error => {
        console.error('Error:', error);
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const titleToSearch = this.props.title.replaceAll("'", '').replaceAll(' ', '+');
    let authorToSerach;
    if (this.props.author !== 'Magazine' || this.props.author !== 'Unkown') {
      authorToSerach = this.props.author.replace('and ', '').replace(/^and /, '').replace(/^by /, '').replaceAll(' ', '+');
    } else {
      authorToSerach = this.props.author;
    }
    if (authorToSerach === 'Unkown' || authorToSerach === 'Magazine' || authorToSerach.includes(',')) {
      this.getBookByTitle(titleToSearch);
    } else if (authorToSerach && titleToSearch) {
      this.getBookByAthorAndTitile(titleToSearch, authorToSerach);
    } else if (!authorToSerach || !titleToSearch) {
      this.getBookByISBN();
    } else {
      this.setState({
        isLoading: false,
        isNotFound: true
      });
    }
  }

  BookToSave() {
    const { url, author, buyLink, number } = this.props;
    const { user } = this.context;
    const { volumeInfo, searchInfo } = this.state.book;
    const { title, description, averageRating, industryIdentifiers, imageLinks } = volumeInfo;
    const cleanDescription = description.replaceAll('<p>', ' ').replaceAll('</p>', ' ').replaceAll('<b>', ' ').replaceAll('<br></i></b><br>', ' ').replaceAll('<br>', ' ').replaceAll('<i>', ' ').replaceAll('</i>', ' ').replaceAll('</b>', ' ');

    const isbn = industryIdentifiers.find(i => i.type === 'ISBN_10');
    let bookCover;
    if (url) {
      bookCover = url;
    } else if (!url) {
      bookCover = imageLinks.small || imageLinks.thumbnail;
    } else {
      bookCover = imageLinks.smallThumbnail;
    }
    let shortDescription;
    if (!searchInfo) {
      shortDescription = cleanDescription.split(' ', 24).join().replaceAll(',', ' ');
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
      authors: author,
      imageLink: bookCover,
      shortDescription,
      description: cleanDescription,
      buyLink,
      averageRating,
      isbn10: isbn.identifier,
      categories,
      weeks: number,
      userId: user.userId
    };
    return objToSend;
  }

  handleClick() {
    const { user, showModal } = this.context;
    if (!user) {
      showModal();
    } else {
      const token = window.localStorage.getItem('book-lover-jwt');
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`
        },
        body: JSON.stringify(this.BookToSave())
      };
      fetch('/api/saved-books/', req)
        .then(() => { window.location.hash = 'my-books'; })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    if (!this.state.book) return;
    if (this.state.isLoading) return <LoadingSpinner />;
    if (this.state.isNotFound) return <NotFound />;

    const { volumeInfo } = this.state.book;
    const { imageLinks, title, description, averageRating, categories } = volumeInfo;
    const cleanDescription = description.replaceAll('<p>', ' ').replaceAll('</p>', ' ').replaceAll('<b>', ' ').replaceAll('<br></i></b><br>', ' ').replaceAll('<br>', ' ').replaceAll('<i>', ' ').replaceAll('</i>', ' ').replaceAll('</b>', ' ');

    let coverToShow = this.props.url;
    if (!coverToShow) {
      coverToShow = imageLinks.small || imageLinks.thumbnail;
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
            <p className='author'><span style={{ fontWeight: '100' }}>by </span>{this.props.author}</p>
              <div className='rating no-margin'>
                {ShowRating(averageRating)}
                <p className='rating no-margin'>Rating: {averageRating}</p>
              </div>
              <p className='full-description description no-padding'>{cleanDescription}</p>
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
