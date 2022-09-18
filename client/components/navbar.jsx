import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryToShow: null
    };
    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const encodedObj = this.state.categories.find(o => o.display_name === event.target.value);
    const encodedName = encodedObj.list_name_encoded;
    this.props.onClick(encodedName);
    this.setState({
      isClicked: !this.state.isClicked,
      showModal: false,
      categoryToShow: event.target.value
    });
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

  getCategories() {
    this.setState({
      categories: this.state.categories,
      isClicked: !this.state.isClicked
    });
  }

  render() {
    const { user } = this.context;
    let categoryToShow;
    if (this.state.categoryToShow) {
      categoryToShow = this.state.categoryToShow;
    }
    const classToShow = this.state.isClicked ? 'show' : 'hidden';
    return (
      <>
        <div className='header position-sticky'>
          <h2 className='header-lover-h2'>BOOK<span className='header-lover'>LOVER</span></h2>
          {
          user !== null && <a className='dropdown my-books' href='#my-books'>My Books</a>
          }
          <div className='dropdown-list-holder flex'>
            <a href='#'
              onClick={this.getCategories}
            className='dropdown'>NYT Best Sellers<span className='span-category'>{categoryToShow}</span>
            </a>
            <div className='dropdown-content'>
              <select onChange={this.handleChange} className={classToShow}>
                <MenuItems categories={this.state.categories} />
              </select>
            </div>
          </div>
            <i onClick={this.props.onAuthClick} className="fa-solid fa-circle-user"></i>
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