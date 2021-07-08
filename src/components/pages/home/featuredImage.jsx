import React from 'react';
import { OverlayLearnMore } from './learnMore';

export default function FeaturedImage({
  src, title, content, href,
}) {
  return (
    <div
      className="jumbotron jumbotron-fluid"
      data-stellar-background-ratio=".5"
      style={{ backgroundImage: `url(${src})` }}
    >
      <div className="row no-gutters">
        <OverlayLearnMore heading={title} content={content} href={href} />
      </div>
    </div>
  );
}
