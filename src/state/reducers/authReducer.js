/*
  authReducer handles state corresponding to the user's authentiation status

  Structure:
  ---
  state
    auth
      isLoggedIn
      loggingIn
      loggingOut
*/

// setLoginSubmit sets the loggingIn state to true
function setLoginSubmit(authState) {
  return authState.set('loggingIn', true);
}

// setLoginSuccess sets the isLoggedIn status to true in the auth state
function setLoginSuccess(authState) {
  return authState.set('isLoggedIn', true).set('loggingIn', false);
}

// setLogoutSubmit sets the loggingOut state to true
function setLogoutSubmit(authState) {
  return authState.set('loggingOut', true);
}

// setLogoutSuccess sets the isLoggedIn status to false in the auth state
function setLogoutSuccess(authState) {
  return authState.set('isLoggedIn', false).set('loggingOut', false);
}

// authReducer uses composer reduction to break auth state reducer to its own function
export default function authReducer(authState, action) {
  switch (action.type) {
    case 'LOGIN_SUBMIT':
      return setLoginSubmit(authState);
    case 'LOGIN_SUCCESS':
      return setLoginSuccess(authState);
    case 'LOGOUT_SUBMIT':
      return setLogoutSubmit(authState);
    case 'LOGOUT_SUCCESS':
      return setLogoutSuccess(authState);
    default:
      return authState;
  }
}
