import React from 'react';

export default class BookCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      intervalId: null
    };
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.nextImg, 3000);
  }

  nextImg() {
    if (this.state.currentIndex === this.props.books.length - 1) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }

  prevImg() {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.props.books.length - 1
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }

  handleClick(e) {
    const { nextImg, prevImg } = this;
    clearInterval(this.intervalId);
    if (e.target.dataset.right) {
      nextImg();
    } else if (e.target.dataset.left) {
      prevImg();
    } else if (e.target.classList.contains('fa-circle')) {
      const index = Number(e.target.dataset.icon);
      this.setState({ currentIndex: index });
    }
    this.intervalId = setInterval(this.nextImg, 3000);
  }

  render() {
    const books = this.props.books;
    const bookEl = books.map((book, index) => {
      return (
        <div className='flex-carousel' key={index}>
          <i onClick={this.handleClick} data-left="left"
            className="fa-solid fa-chevron-left"></i>
          <a href={`#details?isbn=${book.isbn10}&author=${book.author}&title=${book.title}&imageurl=${book.book_image}&n=${book.numberWeeks}&buy=${book.buy_links[0]}`}>
            <div className="image-holder">
              <p className='number-of-weeks' style={{ textAlign: 'center' }}>{book.weeks_on_list} WEEKS ON THE LIST</p>
              <h2 className='title-more-details no-padding ' style={{ textAlign: 'center' }}>{book.title}</h2>
              <img className='more-details-img' key={index} src={book.book_image} alt="pic" />
            </div>
          </a>
          <i onClick={this.handleClick} data-right="right"
            className="fa-solid fa-chevron-right"></i>
        </div>
      );
    });

    return (
        <div >
          {bookEl[this.state.currentIndex]}
        </div>
    );
  }
}
