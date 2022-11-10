import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryToShow: null,
      isClicked: false,
      userInputValue: '',
      searchIsClicked: false
    };
    this.getCategoriesClick = this.getCategoriesClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hashChange = this.hashChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
  }

  handleChange(event) {
    const encodedObj = this.state.categories.find(o => o.display_name === event.target.value);
    // console.log(event.target.value);
    const encodedName = encodedObj.list_name_encoded;
    this.setState({
      isClicked: !this.state.isClicked,
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
    window.location.hash = '#?category=' + event.target.dataset.value;
  }

  getCategoriesClick() {
    this.setState({
      isClicked: !this.state.isClicked
    });
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
    const { getCategoriesClick, searchInput, hashChange, handleChange, searchClick, handleChangeList } = this;
    let categoryToShow;
    if (this.state.categoryToShow) {
      categoryToShow = this.state.categoryToShow;
    }
    const classToShow = this.state.isClicked ? 'show' : 'hidden';
    const classToShowInput = this.state.searchIsClicked ? 'show' : 'hidden';
    return (
      <>
          <div className='header position-sticky'>
          <a href="#" className='header-lover-h2' ><h2>BOOK<span className='header-lover'>LOVER</span></h2></a>
            {
              user !== null && <a className='dropdown my-books' href='#my-books'>My Books</a>
            }
            <div className='dropdown-list-holder flex'>
            <a onClick={getCategoriesClick} className='dropdown'>Monthly Lists<span className='span-category'>{categoryToShow}</span></a>
              <div className='dropdown-content'>
                <select onChange={handleChange} className={`${classToShow} select-list`} >
                  <MenuItems categories={this.state.categories} />
                </select>
              </div>
            </div>
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
          <h1 className='navbar-h1' >The New York Times Best Sellers</h1>
          <h4 className='navbar-h4'>Authoritatively ranked lists of books sold in the United States, sorted by format and genre.</h4>
          <div className='flex flex-navbar'>
            <p data-value='combined-print-and-e-book-fiction' className='navbar-p' onClick={handleChangeList}>FICTION</p>
            <p data-value='hardcover-nonfiction' className='navbar-p' onClick={handleChangeList}>NONFICTION</p>
            <p data-value='childrens-middle-grade' className='navbar-p' onClick={handleChangeList}>CHILDREN’S</p>
            <p data-value='education' className='navbar-p' onClick={handleChangeList}>EDUCATION</p>
            {/* <select onChange={handleChange} className='select-monthly-list navbar-p'>
              <option value="MONTHLY" className='option-monthly-list'>MONTHLY LISTS</option>
              <MenuItems categories={this.state.categories} />
            </select> */}
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
