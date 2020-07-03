import React, { useEffect, useReducer,useRef, useCallback } from 'react';

import './index.css';

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) };
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  // make API calls
  useEffect(() => {
    imgDispatch({ type: 'FETCHING_IMAGES', fetching: true });
    fetch(`https://picsum.photos/v2/list?page=${pager.page}&limit=10`)
      .then((data) => data.json())
      .then((images) => {
        imgDispatch({ type: 'STACK_IMAGES', images });
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false });
      })
      .catch((e) => {
        // handle error
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false });
        return e;
      });
  }, [imgDispatch, pager.page]);

  // implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  // lazy loads images with intersection observer
  // only swap out the image source if the new url exists
  const imagesRef = useRef(null);
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;
          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });
    intObs.observe(node);
  }, []);
  useEffect(() => {
    imagesRef.current = document.querySelectorAll('.card-img-top');
    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgData.images]);

  return (
    <div className=''>
      <nav className='navbar bg-light'>
        <div className='container'>
          <a className='navbar-brand' href='/#'>
            <h2>Infinite scroll + image lazy loading</h2>
          </a>
        </div>
      </nav>
      <div id='images' className='container'>
        <div className='row'>
          {imgData.images.map((image, index) => {
            const { author, download_url } = image;
            return (
              <div key={index} className='card'>
                <div className='card-body '>
                  <img
                    alt={author}
                    data-src={download_url}
                    className='card-img-top'
                    src={
                      'https://picsum.photos/id/870/300/300?grayscale&blur=2'
                    }
                  />
                </div>
                <div className='card-footer'>
                  <p className='card-text text-center text-capitalize text-primary'>
                    Shot by: <strong>{author}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {imgData.fetching && (
        <div className='text-center bg-secondary m-auto p-3'>
          <p className='m-0 text-white'>Getting images</p>
        </div>
      )}
      <div
        id='page-bottom-boundary'
        style={{ border: '1px solid red' }}
        ref={bottomBoundaryRef}
      ></div>
    </div>
  );
}

export default App;
