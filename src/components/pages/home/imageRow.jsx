/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageRow({ images }) {
  return (
    <div className="row">
      { images.map((image, i) => (
        <ImageWrapper image={image} key={i} colWidth={12 / images.length} />
      ))}
    </div>
  );
}

function ImageWrapper({ image, colWidth }) {
  return (
    <div className={`col-${colWidth}`}>
      <Link className="hc-card-image-wrapper" to={image.href}>
        <div className="hc-card-image" data-stellar-background-ratio=".5" style={{ backgroundImage: `url(${image.src})` }}>
          <div className="overlay">
            <div className="hc-card-title-wrapper">
              <div className="hc-card-title">
                <h5>{image.name}</h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
