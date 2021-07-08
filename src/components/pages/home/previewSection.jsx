import React from 'react';
import { Link } from 'react-router-dom';

export default function PreviewSection({
  children, dark, title, link, linkTitle,
}) {
  return (
    <section
      className={`hc-section ${dark ? ' text-light' : ''}`}
      data-stellar-background-ratio={`${dark ? ' .5' : ''}`}
      style={dark ? { backgroundImage: 'url(/public/images/room-1.jpg)' } : {}}
    >
      {dark ? <span className="overlay" /> : ''}
      <div className="container-fluid">
        <div className="section-title clearfix">
          <h2 className="red-bar-below float-left">{title}</h2>
          <Link className="btn btn-primary float-right" to={link}>{linkTitle}</Link>
        </div>
        { children }
      </div>
    </section>
  );
}
