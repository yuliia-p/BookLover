import React from 'react';

export default function ShowRating(rating) { // 3.5
  const stars = [];
  for (let i = 1; i < 6; i++) {
    if (i < rating) {
      stars.push(
        <i key={i} className="fa-solid fa-star"></i>
      );
    }
    if (i > rating) {
      stars.push(
        <i key={i} className="fa-regular fa-star"></i>
      );
    }
    if (rating === 1) {
      <i key={i} className="fa-solid fa-star"></i>;
    }
  }
  return (
    <>
      {stars}
    </>
  );
}
