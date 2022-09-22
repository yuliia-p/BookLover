import React from 'react';
import AppContext from '../lib/app-context';

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookToDelete: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { route } = this.context;
    const bookId = Number(route.params.get('bookId'));
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    };
    fetch(`/api/delete-books/${bookId}`, req)
      .catch(error => {
        console.error('Error:', error);
      });
    this.props.onClick();
    window.location.hash = 'my-books';
  }

  render() {
    return (
      <div className='modal'>
          <div className="auth-modal-content">
            <i onClick={this.props.onClick} className="fa-solid fa-xmark"></i>
            <h1 className='no-margin '>BOOK<span className='header-lover'>LOVER</span></h1>
            <h3 className='log-in-header'>Delete this book?</h3>
            <div className="button-holder">
            <button type="button" className="auth-button" onClick={this.props.onClick} >NO</button>
            <button type="submit" className="auth-button" onClick={this.handleClick}>YES</button>
            </div>
          </div>
      </div>
    );
  }
}
DeleteModal.contextType = AppContext;
