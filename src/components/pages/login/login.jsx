/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { StoreContext } from '../../../state/StoreContext';
import * as routes from '../../routes';

export default function Login(props) {
  const { state, actions, ...rest } = useContext(StoreContext);

  function loginRedirect() {
    if (props.location.state !== undefined) {
      props.history.push(props.location.state.from.pathname);
    } else {
      props.history.push(routes.INDEX);
    }
  }

  function login() {
    actions.auth.login().then(() => loginRedirect());
  }

  if (state.getIn(['auth', 'isLoggedIn']) === true) {
    loginRedirect();
  }

  return (
    <section className="hc-section pt-5">
      <div className="container-fluid">
        <h2>Login</h2>
        <div>
          <p>Welcome to My Hager. Please enter your username and password in the fields below to access your My Hager account. My Hager is our free service that provides you with industry-specific information and tools to customize and store all your Hager job submittals. If you don&#39t have a My Hager Account click the User Registration button below.</p>
        </div>
        <hr />
        <div>
          {
            state.getIn(['auth', 'loggingIn']) === true
              ? <p>Logging in...</p>
              : (
                <>
                  <h4>Sign In</h4>
                  <form>
                    <label htmlFor="username">
                      User Name:
                      <input type="text" name="username" id="username" />
                    </label>
                    <br />
                    <label htmlFor="password">
                      Password:
                      <input type="password" name="password" id="password" />
                    </label>
                    <br />
                    <button onClick={login} type="button">Login</button>
                  </form>
                </>
              )
          }
        </div>
      </div>
    </section>
  );
}
