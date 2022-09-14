import React from 'react';
import MenuItems from '../components/categories-render';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isClicked: false,
      categoryToShow: 'Hardcover Fiction'
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
      categoryToShow: event.target.value
    });
  }

  getCategories() {
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
          categories: data.results,
          isClicked: !this.state.isClicked
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    let categoryToShow;
    if (this.state.categoryToShow) {
      categoryToShow = this.state.categoryToShow;
    }
    const classToShow = this.state.isClicked ? 'show' : 'hidden';
    return (
      <>
        <div className='header'>
          <h2 className='header-lover-h2'>BOOK<span className='header-lover'>LOVER</span></h2>
          <div className='dropdown-list-holder'>
            <a onClick={this.getCategories} className='dropdown' data-view='on'>NYT Best Sellers<span className='span-category'>{categoryToShow}</span></a>
            <div className="dropdown-content">
              <select onChange={this.handleChange} className={classToShow} name="category-names" id="category">
                <optgroup>
                  <MenuItems categories={this.state.categories} />
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </>
    );
  }
}
