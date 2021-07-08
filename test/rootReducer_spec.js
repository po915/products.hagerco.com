import { describe, it } from 'mocha';
import { expect } from 'chai';
import { initialState, rootReducer } from '../src/state/reducers/rootReducer';

describe('rootReducer', () => {
  it('returns state by default', () => {
    const action = { type: 'GENERIC_ACTION' };
    const nextState = rootReducer(initialState, action);
    expect(nextState).to.eql(initialState);
  });

  it('initializes state when initial state is undefined', () => {
    const action = { type: 'GENERIC_ACTION' };
    const nextState = rootReducer(undefined, action);
    expect(nextState).to.eql(initialState);
  });
});
