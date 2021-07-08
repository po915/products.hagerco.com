/* eslint-disable max-len */
import React from 'react';

export default function Show404() {
  document.title = 'Page Not Found';
  return (
    <section className="hc-section pt-5">
      <div className="container-fluid">
        <h2>Page Not Found</h2>
        <p>
          We are sorry, but the page you tried to access does not exist.
          <br />
          <br />
          Please try to find what you are looking for through the main menu at the top of the page.
          If you still cannot find what you are looking for,please send us an email via the Contact Us page.
          <br />
          <br />
          If you do, please indicate that you were trying to find a page that does not exist in the comments box.
          Also indicate what page you were trying to find in that comments box as well.
          <br />
          <br />
          Thank you.
        </p>
      </div>
    </section>
  );
}
