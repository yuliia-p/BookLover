import React from 'react';

export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    fetch('/api/users/sign-up', req)
      .then(res => res.json())
      .then(result => {
      });
  }

  render() {
    // onChange={this.props.onComplete}
    return (
      <div className='modal'>
        <form className='SING-UP' onSubmit={this.handleSubmit}>
          <div className="auth-modal-content">
            <i onClick={this.props.onComplete} className="fa-solid fa-xmark"></i>
            <h1 className='no-margin '>BOOK<span className='header-lover'>LOVER</span></h1>
            <h3 className='sing-up-header'>Sign up</h3>
            <p className='no-margin sing-up-text'>Sign up to see the latest bestsellers and search your favorite authors and books.</p>
            <label htmlFor="username"><p className='auth-margin'>Your name</p></label>
            <input onChange={this.handleChange} type="text" placeholder="Name" name="username" id="username" required />

            <label htmlFor="email"><p className='auth-margin'>Email address</p></label>
            <input onChange={this.handleChange} type="text" placeholder="exapmle@email.com" name="email" id="email" required />

            <label htmlFor="password"><p className='auth-margin'>Create password</p></label>
            <input onChange={this.handleChange} type="password" placeholder="At least 8 characters" name="password" id="password" required />

            <div className="button-holder">
              <button type="submit" className="auth-button" >Sign Up</button>
              <p className='sing-up-text no-margin'>Already have an account?<a className='log-in-a' data-click="to-sing-in">Logn in</a></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
