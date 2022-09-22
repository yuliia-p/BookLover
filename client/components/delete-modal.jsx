import React from 'react';
import AppContext from '../lib/app-context';

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { route } = this.context;
    const bookId = Number(route.params.get('bookId'));
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': `${token}`
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
      <div className='modal delete-modal'>
          <div className="auth-modal-content">
            <i onClick={this.props.onClick} className="fa-solid fa-xmark"></i>
            <h1 className='no-margin '>BOOK<span className='header-lover'>LOVER</span></h1>
            <h3 className='delete-header'>DELETE THIS BOOK?</h3>
            <div className="button-holder y-n-holder flex">
            <div className='flex-basis-100'>
              <button type="submit" className="y-button" onClick={this.handleClick}>YES</button>
            </div>
            <div className='flex-basis-100'>
              <button type="button" className="n-button" onClick={this.props.onClick} >NO</button>
            </div>
            </div>
          </div>
      </div>
    );
  }
}
DeleteModal.contextType = AppContext;
