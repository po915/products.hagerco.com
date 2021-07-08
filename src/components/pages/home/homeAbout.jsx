/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeAbout() {
  return (
    <section className="hc-section">
      <div className="container-fluid">
        <h1 className="red-bar-above">HOMEPAGE LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam faucibus. Nisl purus
          in mollis nunc sed id. Tincidunt tortor aliquam nulla facilisi cras fermentum. Ornare
          arcu odio ut sem nulla.
        </p>
        <Link className="btn btn-primary mt-3" to="#">Learn More</Link>
      </div>
    </section>
  );
}
