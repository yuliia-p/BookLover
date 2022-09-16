import React from 'react';
import AuthForm from '../components/auth-form';

export default class AuthModal extends React.Component {
  render() {
    return (
      <>
      <div className='modal'>
          <AuthForm onAuthClick={this.props.onAuthClick}/>
      </div>
      </>
    );
  }
}
