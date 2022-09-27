import React from 'react';

export default class ProfileMenu extends React.Component {
  render() {
    return (
        <div className="dropdown-profile-menu ">
          <a onClick={this.props.onComplete} className="a-profile" href="#my-books">My Books</a>
          <a onClick={this.props.onClick} className="a-profile" href="#">Sign out</a>
        </div>
    );
  }
}
