/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function ProductPosts({ posts }) {
  return (
    <>
      <p className="mb-0"><strong>From the blog:</strong></p>
      <ul>
        <li><a href="#">Blog Post Title</a></li>
        <li><a href="#">Other Blog Post Title</a></li>
      </ul>
    </>
  );
}
