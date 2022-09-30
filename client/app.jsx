import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import MoreDetails from '../client/pages/more-details';
import SignUpModal from './components/sign-up-modal';
import SignInModal from './components/sign-in-modal';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import MyBooks from './pages/my-books';
import MoreDetailsMybooks from './components/more-details-my-books';
import Search from './components/search';
import NotFound from './pages/not-found';
import DeleteModal from './components/delete-modal';
import ProfileMenu from './components/profile-menu';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      showModal: null,
      user: null,
      deleteModal: false,
      isLoading: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user });
  }

  showModal() {
    const { showModal, user } = this.state;
    this.setState({ showModal: 'signIn' });
    if (showModal === 'signIn') {
      this.setState({ showModal: 'signUp' });
    }
    if (user) {
      this.setState({ showModal: 'profile-menu' });
    }
  }

  hideModal() {
    this.setState({ showModal: null });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({
      user
    });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({
      user: null,
      showModal: null
    });
  }

  deleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      const category = route.params.get('category');
      return (
        <div className='container'>
          <Home category={category}/>
        </div>
      );
    }
    if (route.path === 'details') {
      const isbn = route.params.get('isbn');
      const author = route.params.get('author');
      const title = route.params.get('title');
      const imgageUrl = route.params.get('imageurl');
      const numberWeeks = route.params.get('n');
      const buyLink = route.params.get('buy');
      return <MoreDetails isbn={isbn} author={author} title={title} url={imgageUrl} number={numberWeeks} buyLink={buyLink} />;
    }
    if (this.state.user && route.path === 'my-books') {
      return <MyBooks />;
    }
    if (route.path === 'my-book-details') {
      const bookId = route.params.get('bookId');
      return <MoreDetailsMybooks bookId={bookId} onClick={this.deleteModal}/>;
    }
    if (route.path === 'search') {
      const searchValue = route.params.get('txt');
      if (searchValue === '') {
        return <NotFound />;
      }
      return <Search value={searchValue}/>;
    }
    if (route.path === 'search-details') {
      const isbn = route.params.get('isbn');
      const author = route.params.get('author');
      const title = route.params.get('title');
      const buyLink = route.params.get('buy-link');
      return <MoreDetails isbn={isbn} author={author} title={title} buyLink={buyLink}/>;
    }
    return <NotFound />;
  }

  render() {
    const { showModal, hideModal, handleSignIn, deleteModal, handleSignOut } = this;
    const { user, route } = this.state;
    const contextValue = { user, route, showModal };
    return (
      <AppContext.Provider value={contextValue}>
        <Navbar onAuthClick={showModal} />
          {this.renderPage()}
          {this.state.showModal === 'signUp' && <SignUpModal onComplete={hideModal} onSignIn={showModal}/>}
          {this.state.showModal === 'signIn' && <SignInModal onSignIn={handleSignIn} onComplete={hideModal} onSignUp={showModal}/>}
          {this.state.showModal === 'profile-menu' && <ProfileMenu onClick={handleSignOut} onComplete={hideModal}/>}
          {this.state.deleteModal === true && <DeleteModal onClick={deleteModal}/> }
      </AppContext.Provider>
    );
  }
}
