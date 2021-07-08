export default function authActions(state, dispatch) {
  const login = async () => {
    dispatch({ type: 'LOGIN_SUBMIT' });
    // Simulate waiting for async login
    await new Promise(resolve => setTimeout(resolve, 5000));
    dispatch({ type: 'LOGIN_SUCCESS' });
    return true;
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT_SUBMIT' });
    // Simulate waiting for async login
    await new Promise(resolve => setTimeout(resolve, 5000));
    dispatch({ type: 'LOGOUT_SUCCESS' });
    return true;
  };

  return {
    login,
    logout,
  };
}
