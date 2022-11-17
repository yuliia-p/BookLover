import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='desktop-view'>
        <div className='footer' style={{ padding: '2rem' }}>
          <h4 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Weekly Best Sellers Lists</h4>
          <div className='row flex'>
            <div className='column-third'>
              <h4 style={{ marginTop: '0', marginBottom: '0.35rem' }}>FICTION</h4>
              <a href='#list?category=combined-print-and-e-book-fiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Combined Print and E-Book Fiction</p></a>
              <a href='#list?category=hardcover-fiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Hardcover Fiction</p></a>
              <a href='#list?category=trade-fiction-paperback'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Paperback Trade Fiction</p></a>
            </div>
            <div className='column-third'>
              <h4 style={{ marginTop: '0', marginBottom: '0.35rem' }}>FICTION</h4>
              <a href='#list?category=combined-print-and-e-book-nonfiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Combined Print and E-Book Fiction</p></a>
              <a href='#list?category=hardcover-fiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Hardcover Fiction</p></a>
              <a href='#list?category=trade-fiction-paperback'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Paperback Trade Fiction</p></a>
            </div>
            <div className='column-third'>
              <a href='#list?category=cchildrens-middle-grade'></a>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
