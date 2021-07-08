import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map } from 'immutable';
import authReducer from '../src/state/reducers/authReducer';

describe('authReducer', () => {
  it('handles login submit action', () => {
    const initialState = Map({
      isLoggedIn: false,
    });
    const action = { type: 'LOGIN_SUBMIT' };
    const nextState = authReducer(initialState, action);

    expect(nextState).to.eql(Map({
      isLoggedIn: false,
      loggingIn: true,
    }));
  });

  it('handles login success action', () => {
    const initialState = Map({
      isLoggedIn: false,
      loggingIn: true,
    });
    const action = { type: 'LOGIN_SUCCESS' };
    const nextState = authReducer(initialState, action);

    expect(nextState).to.eql(Map({
      loggingIn: false,
      isLoggedIn: true,
    }));
  });

  it('handles logout submit action', () => {
    const initialState = Map({
      isLoggedIn: true,
    });
    const action = { type: 'LOGOUT_SUBMIT' };
    const nextState = authReducer(initialState, action);

    expect(nextState).to.eql(Map({
      loggingOut: true,
      isLoggedIn: true,
    }));
  });

  it('handles logout success action', () => {
    const initialState = Map({
      loggingOut: true,
      isLoggedIn: true,
    });
    const action = { type: 'LOGOUT_SUCCESS' };
    const nextState = authReducer(initialState, action);

    expect(nextState).to.eql(Map({
      loggingOut: false,
      isLoggedIn: false,
    }));
  });
});
