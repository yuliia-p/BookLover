import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryToShow: null,
      isClicked: false,
      userInputValue: ''
    };
    this.getCategoriesClick = this.getCategoriesClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hashChange = this.hashChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }

  // onChange on select element
  handleChange(event) {
    const encodedObj = this.state.categories.find(o => o.display_name === event.target.value);
    /*
    display_name: "E-Book Fiction"
    list_name: "E-Book Fiction"
    list_name_encoded: "e-book-fiction"
    newest_published_date: "2017-01-29"
    oldest_published_date: "2011-02-13"
    updated: "WEEKLY"
    */
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

  getCategoriesClick() {
    this.setState({
      isClicked: !this.state.isClicked
    });
  }

  searchInput(event) {
    this.setState({ userInputValue: event.target.value });
  }

  hashChange(event) {
    event.preventDefault();
    window.location.hash = 'search?txt=' + this.state.userInputValue;
    this.setState({ userInputValue: '' });
  }

  render() {
    const { user } = this.context;
    const { getCategoriesClick, searchInput, hashChange, handleChange } = this;
    let categoryToShow;
    if (this.state.categoryToShow) {
      categoryToShow = this.state.categoryToShow;
    }
    const classToShow = this.state.isClicked ? 'show' : 'hidden';
    return (
      <>
          <div className='header position-sticky'>
          <a href="#" className='header-lover-h2' ><h2>BOOK<span className='header-lover'>LOVER</span></h2></a>
            {
              user !== null && <a className='dropdown my-books' href='#my-books'>My Books</a>
            }
            <div className='dropdown-list-holder flex'>
              <a onClick={getCategoriesClick} className='dropdown'>NYT Best Sellers<span className='span-category'>{categoryToShow}</span></a>
              <div className='dropdown-content'>
                <select onChange={handleChange} className={classToShow}>
                  <MenuItems categories={this.state.categories} />
                </select>
              </div>
            </div>
            <div className="box">
              <form className="search" onSubmit={hashChange}>
                <input placeholder="" type="text" className="input text-input" name="txt" onChange={searchInput} />
              </form>
            </div>
            <div className='profile-menu'>
              <i onClick={this.props.onAuthClick} className="fa-solid fa-circle-user"></i>
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
