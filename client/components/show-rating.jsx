import React from 'react';

export default function ShowRating(rating) {
  const stars = [];
  for (let i = 1; i < 6; i++) {
    if (rating - i >= 0) {
      stars.push(
        <i key={i} className="fa-solid fa-star"></i>
      );
    } else if (rating - i < 0 && rating - i > -1) {
      stars.push(
        <i key={i} className="fa-solid fa-star-half-stroke"></i>
      );
    } else {
      stars.push(
        <i key={i} className="fa-regular fa-star"></i>
      );
    }
  }
  return (
    <>
      {stars}
    </>
  );
}
