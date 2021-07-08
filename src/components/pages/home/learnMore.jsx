/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export function OverlayLearnMore({ heading, content, href, overlayPosition }) {
  return (
    <div
      className={`callout ${overlayPosition != null ? overlayPosition[0] : 'mr-auto'}`}
      style={{ width: overlayPosition != null ? overlayPosition[1] : '50%' }}
    >
      <h4 className="display-2 mb-3">{heading}</h4>
      <p>{content}</p>
      <Link to={href} className="btn btn-primary mt-3">Learn More</Link>
    </div>
  );
}

export function ImageLearnMoreRow({ images, classes }) {
  return (
    <div className={`row ${classes}`}>
      {images.map((image, i) => (
        <ImageLearnMore
          key={i}
          image={image}
          colWidth={12 / images.length}
        />
      ))}
    </div>
  );
}

export function ImageLearnMore({ image, colWidth }) {
  return (
    <div className={`col-${colWidth}`}>
      <Link to="#" className="hc-card-image-wrapper">
        <div className="hc-card-image" data-stellar-background-ratio=".5" style={{ backgroundImage: `url(${image.src})` }}>
          { image.overlay !== undefined
            ? (
              <div className="overlay">
                <div className="hc-card-title-wrapper">
                  <div className="hc-card-title">
                    <h5>{image.overlay}</h5>
                  </div>
                </div>
              </div>
            ) : ('')
          }
        </div>
      </Link>
      <div className="hc-card-body">
        { image.heading !== undefined
          ? (
            <div className="blog-title red-bar-below text-truncate">
              <h4>
                <span className="heading-label">{image.heading}</span>
                { image.subheading !== undefined
                  ? ` ${image.subheading}`
                  : ''
                }
              </h4>
            </div>
          ) : ('')
        }
        <p>{image.description}</p>
        <Link to={image.href} className="btn btn-sm btn-outline-primary">Learn More</Link>
      </div>
    </div>
  );
}
