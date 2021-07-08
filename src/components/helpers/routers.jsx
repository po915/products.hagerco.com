import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StoreContext } from '../../state/StoreContext';
import * as routes from '../routes';

export default function AuthRoute({ component: Component, ...rest }) {
  // eslint-disable-next-line no-unused-vars
  const { state, ...contextRest } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={props => (
        state.getIn(['auth', 'isLoggedIn']) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: routes.LOGIN,
            state: { from: props.location },
          }}
          />
        )
      )}
    />
  );
}
