import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map } from 'immutable';
import homeReducer, { actionStateMap } from '../src/state/reducers/homeReducer';

describe('homeReducer', () => {
  // Test each of the SET actions, which effectively call the same
  // updateHomeState function and do the same thing
  Object.entries(actionStateMap).forEach(([actionType, property]) => {
    it(`handles the ${actionType} action`, () => {
      const initialState = Map({});
      const payload = 'test';
      const action = { type: actionType, payload };
      const nextState = homeReducer(initialState, action);

      expect(nextState).to.eql(Map({
        [property]: payload,
      }));
    });
  });
});
