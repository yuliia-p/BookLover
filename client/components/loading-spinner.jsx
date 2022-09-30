
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className='center'>
      <p>Loading...</p>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  );
}
