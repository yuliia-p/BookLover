import React from 'react';

function ShowRating(rating) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starClass =
      rating - i >= 1
        ? 'fa-solid fa-star'
        : rating - i >= 0.5
          ? 'fa-solid fa-star-half-stroke'
          : 'fa-regular fa-star';
    return <i key={i} className={starClass}></i>;
  });

  return <>{stars}</>;
}

export default ShowRating;
