import React from 'react';
// not used yet
export default function NotFound(props) {
  return (
    <div>
      <div className="row">
        <div className="center">
          <h3>
            Uh oh, we could not find the Book you were looking for!
            <p>
              <a href="#">Return to <span className='not-found-a'>Main page</span></a>
            </p>
          </h3>
        </div>
      </div>
    </div>
  );
}
