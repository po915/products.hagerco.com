import React from 'react';
import {Link} from 'react-router-dom';
import { OverlayLearnMore } from '../home/learnMore';

export function Hs4Images( {image, colWidth } ) {
    return ( 
        <div className={`col-${colWidth}`} >
            <div className="hc-card-image" data-stellar-background-ratio=".5" style={{ backgroundImage: `url(${image})` }} ></div>
        </div>
    );
}

export function Hs4Info( {colWidth, title, content} ){
    return (
        <div className={`col-${colWidth}`}>
            <div className="hc-card-body h-100">
                <h4 className="display-2 mb-3">{title}</h4>
                <p>{content}</p>
                <Link to="#" className="btn btn-primary mt-3">Learn More</Link>
            </div>
        </div>
    );
}
export function HowItWorks({
  src, title, content, href,
}) {
    const overlayPositionMap = {
        0: ['mr-auto', '50%'],
    };

  return (
    <div
      className="jumbotron jumbotron-fluid"
      data-stellar-background-ratio=".5"
      style={{ backgroundImage: `url(${src})` }}
    >
      <div className="row no-gutters">
        <OverlayLearnMore heading={title} content={content} href={href} overlayPosition={overlayPositionMap[0]} />
      </div>
    </div>
  );
}
