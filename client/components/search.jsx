import React from 'react';
import AppContext from '../lib/app-context';
import LoadingSpinner from '../components/loading-spinner';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const searchKeyWords = this.props.value.replaceAll(' ', '+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKeyWords}&maxResults=20&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data => {
        const resultNoISBN = data.items.filter(book => book.volumeInfo.imageLinks);
        this.setState({
          results: resultNoISBN,
          isLoading: false
        });

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const searchKeyWords = this.props.value.replaceAll(' ', '+');
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKeyWords}&maxResults=20&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const request = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      fetch(url, request)
        .then(response => response.json())
        .then(data => {
          const resultNoISBN = data.items.filter(book => book.volumeInfo.imageLinks);
          this.setState({
            results: resultNoISBN,
            isLoading: false
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    const { results, isLoading } = this.state;
    return (
      <>
      { isLoading
        ? <LoadingSpinner />
        : <div className='container'>
          <ul>
            {
              results.map(book => <ResultBook key={book.id} book={book} />)
            }
          </ul>
        </div>
      }
      </>
    );
  }
}

Search.contextType = AppContext;

function GetISBN(book) {
  let isbn;
  if (book.industryIdentifiers) {
    const isbn10 = book.industryIdentifiers.find(obj => obj.type === 'ISBN_10' || 'OTHER');
    if (isbn10.type === 'ISBN_10') {
      isbn = isbn10.identifier;
    } else {
      isbn = null;
    }
  } else if (!book.industryIdentifiers || book.industryIdentifiers.length === 1) {
    isbn = null;
  }
  return isbn;
}

function GetAuthor(book) {
  let authors;
  if (book.authors) {
    authors = book.authors.join(', ');
  } else if (!book.authors && book.printType === 'MAGAZINE') {
    authors = 'Magazine';
  } else {
    authors = 'Unkown';
  }
  return authors;
}

function ResultBook(props) {
  const { volumeInfo, saleInfo } = props.book;
  const { imageLinks, title, description } = volumeInfo;

  let buyLink;
  if (saleInfo.buyLink) {
    buyLink = encodeURIComponent(saleInfo.buyLink);
  } else {
    buyLink = '';
  }
  return (
    <a
      href={`#search-details?isbn=${GetISBN(volumeInfo)}&author=${GetAuthor(volumeInfo)}&title=${title}&buy-link=${buyLink}`}
      className='flex margin-top a-book search-list'>
      <li className='flex margin-top '>
        <img className='book-list-img' src={imageLinks.thumbnail} alt={title} />
        <div className='content-holder'>
          <p className='title margin-top'>{title}</p>
          <p className='author margin-top'>by {GetAuthor(volumeInfo)}</p>
          <p className='description-overflow margin-top'>{description}</p>
        </div>
      </li>
    </a>
  );
}
