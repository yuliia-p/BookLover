import React, { useState, useEffect } from 'react';

export default function BookCarousel(props) {
  const { children, show } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = e => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = e => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      next();
    }
    if (diff < -5) {
      prev();
    }
    setTouchPosition(null);
  };

  useEffect(() => {
    setLength(children.props.books.length);
  }, [children]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const next = () => {
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper">
        {
          currentIndex > 0 &&
          <i onClick={prev} className="fa fa-chevron-left"></i>
        }
        <div className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}>
          <div
            className={`carousel-content show-${show}`}
            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
          >
            {children}
          </div>
        </div>
        {
          currentIndex < (length - show) &&
          <i onClick={next} className="fa fa-chevron-right"></i>
        }
      </div>
    </div>
  );
}
