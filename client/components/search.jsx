import React from 'react';
import AppContext from '../lib/app-context';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const searchKeyWords = this.props.value.replaceAll(' ', '+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKeyWords}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then(data => {
        const result = data.items.filter(book => book.volumeInfo.industryIdentifiers.length > 1 && book.volumeInfo.imageLinks);
        this.setState({
          results: result
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const searchKeyWords = this.props.value.replaceAll(' ', '+');
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchKeyWords}&projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const request = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      fetch(url, request)
        .then(response => response.json())
        .then(data => {
          const result = data.items.filter(book => book.volumeInfo.industryIdentifiers.length > 1 && book.volumeInfo.imageLinks);
          this.setState({
            results: result
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    const { results } = this.state;
    return (
      <div className='container'>
        <ul>
          {
              results.map(book => <ResultBook key={book.id} book={book} />)
          }
        </ul>
      </div>
    );
  }
}

Search.contextType = AppContext;

function ResultBook(props) {
  const { volumeInfo, saleInfo } = props.book;
  const { imageLinks, title, description } = volumeInfo;
  const isnb = volumeInfo.industryIdentifiers.find(obj => obj.type === 'ISBN_10');
  let buyLink;
  if (saleInfo.buyLink) {
    buyLink = encodeURIComponent(saleInfo.buyLink);
  } else {
    buyLink = '';
  }
  let authors;
  if (!props.book.volumeInfo.authors || props.book.volumeInfo.authors.length < 0) {
    authors = 'Unkown';
  } else {
    authors = props.book.volumeInfo.authors.join();
  }
  return (
    <a
      href={`#search-details?isbn=${isnb.identifier}&author=${authors}&title=${title}&buy-link=${buyLink}`}
      className='flex margin-top a-book'>
      <li className='flex margin-top'>
        <img src={imageLinks.thumbnail} alt={title} />
        <div className='content-holder'>
          <p className='title margin-top'>{title}</p>
          <p className='author margin-top'>by {authors}</p>
          <p className='description-overflow margin-top'>{description}</p>
          <p href="#search-details" className='more-details-p'>More Details...</p>
        </div>
      </li>
    </a>
  );
}
