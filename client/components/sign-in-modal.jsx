import React from 'react';

export default class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/users/sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.props.onSignIn(result);
      });

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    // onClick={this.props.onComplete} on button to hide modal wont work
    return (
      <div className='modal'>
        <form className='SING-IN' onSubmit={this.handleSubmit}>
          <div className="auth-modal-content">
            <i onClick={this.props.onComplete} className="fa-solid fa-xmark"></i>
            <h1 className='no-margin '>BOOK<span className='header-lover'>LOVER</span></h1>
            <h3 className='log-in-header'>Log in</h3>

            <label htmlFor="email"><p className='auth-margin'>Email address</p></label>
            <input onChange={this.handleChange} type="text" placeholder="" name="email" id="log-in-email" required />

            <label htmlFor="password"><p className='auth-margin'>Password</p></label>
            <input onChange={this.handleChange} type="password" placeholder="" name="password" id="log-in-password" required />

            <div className="button-holder">
              <button type="submit" className="auth-button" >Log in</button>
              <p className='sing-up-text no-margin'>Don&#39;t have an account?<a onClick={this.props.onSignUp} className='log-in-a' data-click="to-sing-up">Sign Up</a></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
