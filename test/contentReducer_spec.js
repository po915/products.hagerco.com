import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map } from 'immutable';
import contentReducer from '../src/state/reducers/contentReducer';

describe('contentReducer', () => {
  it('handles set content loading true action', () => {
    const initialState = Map({
      status: null,
    });
    const action = { type: 'SET_CONTENT_LOADING', payload: { loading: true } };
    const nextState = contentReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: null,
      loading: true,
    }));
  });

  it('handles set content loading false action', () => {
    const initialState = Map({
      loading: true,
    });
    const action = { type: 'SET_CONTENT_LOADING', payload: { loading: false } };
    const nextState = contentReducer(initialState, action);

    expect(nextState).to.eql(Map({
      loading: false,
    }));
  });

  it('handles set content details action with successful fetch', () => {
    const initialState = Map({
      status: null,
    });
    const payload = {
      status: true,
      content: {
        title: 'Test',
        intro: 'Test intro content',
        main: 'Test main content',
      },
    };
    const action = { type: 'SET_CONTENT_DETAILS', payload };
    const nextState = contentReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: true,
      details: Map({
        title: 'Test',
        intro: 'Test intro content',
        main: 'Test main content',
      }),
    }));
  });

  it('handles set content details action with unsuccessful fetch', () => {
    const initialState = Map({
      status: null,
    });
    const action = { type: 'SET_CONTENT_DETAILS', payload: { status: false, content: null } };
    const nextState = contentReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: false,
    }));
  });

  it('handles set content details action with null article (clear)', () => {
    const initialState = Map({
      status: true,
      details: Map({
        title: 'Test',
        intro: 'Test intro content',
        main: 'Test main content',
      }),
    });
    const action = { type: 'SET_CONTENT_DETAILS', payload: { status: null, content: null } };
    const nextState = contentReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: null,
    }));
  });
});
