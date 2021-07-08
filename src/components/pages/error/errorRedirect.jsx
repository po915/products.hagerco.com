import React from 'react';
import { Redirect } from 'react-router-dom';
import * as routes from '../../routes';

export default function ErrorRedirect(location) {
  return (
    <Redirect
      to={{
        pathname: routes.ERROR,
        state: { from: location },
      }}
    />
  );
}
