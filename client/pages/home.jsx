import React from 'react';
import { BookList, BookListCarousel } from '../components/books-list';
import LoadingSpinner from '../components/loading-spinner';
import BookCarousel from '../components/book-list-by-category';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      fictionBooks: [],
      nonFictionBooks: [],
      childrensBooks: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadBooks();
    this.loadNonFictionBooks();
    this.loadFictionBooks();
    this.loadChildrensBooks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.loadBooks();
    }
  }

  loadBooks() {
    this.setState({ isLoading: true });
    const category = this.props.category || 'combined-print-and-e-book-fiction';
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
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  loadFictionBooks() {
    this.setState({ isLoading: true });
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.BOOKS_API_KEY}`;
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
          fictionBooks: data.results.books,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  loadNonFictionBooks() {
    this.setState({ isLoading: true });
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.BOOKS_API_KEY}`;
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
          nonFictionBooks: data.results.books,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  loadChildrensBooks() {
    this.setState({ isLoading: true });
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade.json?api-key=${process.env.BOOKS_API_KEY}`;
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
          childrensBooks: data.results.books,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { books, isLoading, nonFictionBooks, fictionBooks, childrensBooks } = this.state;
    return (
      <>
        {isLoading
          ? <LoadingSpinner />
          : <div className='mobile-view'>
            <BookList books={books} />
          </div>}
        {isLoading
          ? <LoadingSpinner />
          : <div className='desktop-view'>
            <a href='#list?category=combined-print-and-e-book-fiction' className='category-a'>
              Combined Print &amp; E-Book Fiction<span><i className="fa fa-solid fa-angle-right"></i></span></a>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
              <BookCarousel show={5}>
                <BookListCarousel books={fictionBooks} />
              </BookCarousel>
            </div>
            <a href='#list?category=combined-print-and-e-book-nonfiction' className='category-a'>
              Combined Print &amp; E-Book Nonfiction<span><i className="fa fa-solid fa-angle-right"></i></span></a>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
              <BookCarousel show={5}>
                <BookListCarousel books={nonFictionBooks} />
              </BookCarousel>
            </div>
            <a href='#list?category=childrens-middle-grade' className='category-a'>
              Children’s Middle Grade<span><i className="fa fa-solid fa-angle-right"></i></span></a>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
              <BookCarousel show={5}>
                <BookListCarousel books={childrensBooks} />
              </BookCarousel>
            </div>
          </div>
        }
      </>
    );
  }
}
// import React, { useState, useEffect } from 'react';
// import { BookList, BookListCarousel } from '../components/books-list';
// import LoadingSpinner from '../components/loading-spinner';
// import BookCarousel from '../components/book-list-by-category';

// const Home = ({ category }) => {
//   const [books, setBooks] = useState([]);
//   const [fictionBooks, setFictionBooks] = useState([]);
//   const [nonFictionBooks, setNonFictionBooks] = useState([]);
//   const [childrensBooks, setChildrensBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadBooks = () => {
//     setIsLoading(true);
//     const selectedCategory = category || 'combined-print-and-e-book-fiction';
//     const url = `https://api.nytimes.com/svc/books/v3/lists/current/${selectedCategory}.json?api-key=${process.env.BOOKS_API_KEY}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setBooks(data.results.books);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     loadBooks();
//     loadNonFictionBooks();
//     loadFictionBooks();
//     loadChildrensBooks();
//   });

//   const loadFictionBooks = () => {
//     setIsLoading(true);
//     const url = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.BOOKS_API_KEY}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setFictionBooks(data.results.books);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   const loadNonFictionBooks = () => {
//     setIsLoading(true);
//     const url = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.BOOKS_API_KEY}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setNonFictionBooks(data.results.books);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   const loadChildrensBooks = () => {
//     setIsLoading(true);
//     const url = `https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade.json?api-key=${process.env.BOOKS_API_KEY}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setChildrensBooks(data.results.books);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };
//   return (
//     <>
//       {isLoading
//         ? (
//         <LoadingSpinner />
//           )
//         : (
//         <div className='mobile-view'>
//           <BookList books={books} />
//         </div>
//           )}
//       {isLoading
//         ? (
//         <LoadingSpinner />
//           )
//         : (
//         <div className='desktop-view'>
//           <a href='#list?category=combined-print-and-e-book-fiction' className='category-a'>
//             Combined Print &amp; E-Book Fiction<span><i className="fa fa-solid fa-angle-right"></i></span></a>
//           <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
//             <BookCarousel show={5}>
//               <BookListCarousel books={fictionBooks} />
//             </BookCarousel>
//           </div>
//           <a href='#list?category=combined-print-and-e-book-nonfiction' className='category-a'>
//             Combined Print &amp; E-Book Nonfiction<span><i className="fa fa-solid fa-angle-right"></i></span></a>
//           <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
//             <BookCarousel show={5}>
//               <BookListCarousel books={nonFictionBooks} />
//             </BookCarousel>
//           </div>
//           <a href='#list?category=childrens-middle-grade' className='category-a'>
//             Children’s Middle Grade<span><i className="fa fa-solid fa-angle-right"></i></span></a>
//           <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
//             <BookCarousel show={5}>
//               <BookListCarousel books={childrensBooks} />
//             </BookCarousel>
//           </div>
//         </div>
//           )}
//     </>
//   );

// };
// export default Home;
