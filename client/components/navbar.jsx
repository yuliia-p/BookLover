import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryToShow: null,
      userInputValue: '',
      searchIsClicked: false
    };
    // this.getCategoriesClick = this.getCategoriesClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hashChange = this.hashChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
  }

  handleChange(event) {
    const encodedObj = this.state.categories.find(o => o.display_name === event.target.value);
    const encodedName = encodedObj.list_name_encoded;
    this.setState({
      categoryToShow: event.target.value
    });
    window.location.hash = '#?category=' + encodedName;
  }

  componentDidMount() {
    const url = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.BOOKS_API_KEY}`;
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
          categories: data.results
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleChangeList(event) {
    const displayNameObj = this.state.categories.find(o => o.list_name_encoded === event.target.value);
    const displayName = displayNameObj.display_name;
    this.setState({ categoryToShow: displayName });
    window.location.hash = '#?category=' + event.target.value;
  }

  searchClick(event) {
    this.setState({ searchIsClicked: !this.state.searchIsClicked });
  }

  searchInput(event) {
    this.setState({ userInputValue: event.target.value });
  }

  hashChange(event) {
    event.preventDefault();
    window.location.hash = 'search?txt=' + this.state.userInputValue;
    this.setState({
      userInputValue: '',
      searchIsClicked: false
    });
  }

  render() {
    const { user } = this.context;
    const { searchInput, hashChange, handleChange, searchClick, handleChangeList } = this;
    let categoryToShow;
    if (this.state.categoryToShow) {
      categoryToShow = this.state.categoryToShow;
    }
    const classToShowInput = this.state.searchIsClicked ? 'show' : 'hidden';
    return (
      <>
          <div className='header position-sticky'>
          <a href="#" className='header-lover-h2' ><h2>BOOK<span className='header-lover'>LOVER</span></h2></a>
            {
              user !== null && <a className='dropdown my-books' href='#my-books'>My Books</a>
            }
            <div className="box">
              <form className="search flex" onSubmit={hashChange}>
              <input placeholder="Search" type="text" className={`input ${classToShowInput}`} value={this.state.userInputValue} onChange={searchInput} required />
              <button className="search-submit" type="submit"><i onClick={searchClick} className="fas fa-search"></i></button>
              </form>
            </div>
            <div className='profile-menu user-div'>
              <i onClick={this.props.onAuthClick} className="fa-solid fa-circle-user"></i>
            </div>
          </div>
        <div className='navbar-div container'>
          {
            categoryToShow ? <h1 className='navbar-h1' >{categoryToShow}</h1> : <h1 className='navbar-h1' >The New York Times Best Sellers</h1>
          }
          <h4 className='navbar-h4'>Authoritatively ranked lists of books sold in the United States, sorted by format and genre.</h4>
          <div className='flex flex-navbar'>
            <select name="FICTION" className='navbar-select' onChange={handleChangeList} defaultValue='default' style={{ width: '4.1875rem' }}>
                <option className='option-navbar' value="default" disabled>FICTION</option>
                <option className='option-navbar' value="combined-print-and-e-book-fiction">Combined Print and E-Book Fiction</option>
                <option className='option-navbar' value="hardcover-fiction">Hardcover Fiction</option>
                <option className='option-navbar' value="trade-fiction-paperback">Paperback Trade Fiction</option>
            </select>
            <select className='navbar-select' onChange={handleChangeList} defaultValue='default' style={{ width: '5.85rem' }}>
              <option className='option-navbar' value="default" disabled >NONFICTION</option>
              <option className='option-navbar' value="combined-print-and-e-book-nonfiction">Combined Print and E-Book Nonfiction</option>
              <option className='option-navbar' value="hardcover-nonfiction">Hardcover Nonfiction</option>
              <option className='option-navbar' value="paperback-nonfiction">Paperback Nonfiction</option>
              <option className='option-navbar' value="e-book-nonfiction">E-Book Nonfiction</option>
            </select>
            <select className='navbar-select' onChange={handleChangeList} defaultValue='default' style={{ width: '5.8rem' }}>
              <option className='option-navbar' value="default" disabled >CHILDREN’S</option>
              <option className='option-navbar' value="childrens-middle-grade">Children’s Middle Grade</option>
              <option className='option-navbar' value="picture-books">Children’s Picture Books</option>
              <option className='option-navbar' value="series-books">Children’s Series</option>
              <option className='option-navbar' value="young-adult">Young Adult</option>
            </select>
            <select className='navbar-select' onChange={handleChange} defaultValue='default' style={{ width: '7.2rem' }}>
              <option className='option-navbar' value="default" disabled >MONTHLY LISTS</option>
              <MenuItems categories={this.state.categories} />
            </select>
          </div>
        </div>
      </>
    );
  }
}

function MenuItems(props) {
  return (
    props.categories.map((category, index) => {
      return <Category key={index} category={category} />;
    })

  );
}

function Category(props) {
  return (
    <option value={props.category.display_name}>{props.category.display_name}</option>
  );
}

Navbar.contextType = AppContext;
