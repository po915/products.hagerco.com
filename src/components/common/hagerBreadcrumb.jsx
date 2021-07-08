/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function HagerBreadcrumb({ path }) {
  return (
    <Breadcrumb>
      {
        path.map((link, i) => {
          if (path.length === i + 1) {
            return <BreadcrumbItem active key={i}>{link.name}</BreadcrumbItem>;
          }
          return <BreadcrumbItem key={i}><a href={link.href}>{link.name}</a></BreadcrumbItem>;
        })
      }
    </Breadcrumb>
  );
}
