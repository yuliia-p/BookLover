import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='desktop-view'>
        <div className='footer' style={{ padding: '2rem' }}>
          <h4 className='h4-footer' style={{ marginTop: '1rem', marginBottom: '1rem' }}>Weekly Best Sellers Lists</h4>
          <div className='row flex'>
            <div className='column-third'>
              <h4 style={{ marginTop: '0', marginBottom: '0.35rem' }}>FICTION</h4>
              <a className='a-footer' href='#list?category=combined-print-and-e-book-fiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Combined Print &amp; E-Book Fiction</p></a>
              <a className='a-footer'href='#list?category=hardcover-fiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Hardcover Fiction</p></a>
              <a className='a-footer'href='#list?category=trade-fiction-paperback'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Paperback Trade Fiction</p></a>
            </div>
            <div className='column-third'>
              <h4 style={{ marginTop: '0', marginBottom: '0.35rem' }}>NONFICTION</h4>
              <a className='a-footer'href='#list?category=combined-print-and-e-book-nonfiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Combined Print &amp; E-Book Nonfiction</p></a>
              <a className='a-footer'href='#list?category=hardcover-nonfiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Hardcover Nonfiction</p></a>
              <a className='a-footer'href='#list?category=paperback-nonfiction'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Paperback Nonfiction</p></a>
              <a className='a-footer'href='#list?category=hardcover-advice'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Advice, How-To &amp; Miscellaneous</p></a>
            </div>
            <div className='column-third'>
              <h4 style={{ marginTop: '0', marginBottom: '0.35rem' }}>CHILDREN’S</h4>
              <a className='a-footer'href='#list?category=childrens-middle-grade-hardcover'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Children’s Middle Grade Hardcover</p></a>
              <a className='a-footer'href='#list?category=picture-books'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Children’s Picture Books</p></a>
              <a className='a-footer'href='#list?category=series-books'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Children’s Series</p></a>
              <a className='a-footer'href='#list?category=young-adult-hardcover'>
                <p style={{ fontSize: '0.75rem', marginTop: '0', marginBottom: '0.35rem' }}>
                  Young Adult Hardcover</p></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
