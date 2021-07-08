import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import navbarReducer from '../src/state/reducers/navbarReducer';
import { SECTION_ENUM } from '../src/util';

describe('navbarReducer', () => {
  it('handles set active section', () => {
    const initialState = Map({
      activeSection: null,
      dropdownContent: Map({}),
    });
    const action = { type: 'SET_ACTIVE_SECTION', payload: { section: SECTION_ENUM.PRODUCTS } };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(Map({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: Map({}),
    }));
  });

  it('handles set section loading', () => {
    const initialState = Map({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: Map({
        [SECTION_ENUM.PRODUCTS]: Map({}),
      }),
    });
    const action = { type: 'SET_SECTION_LOADING', payload: { section: SECTION_ENUM.PRODUCTS, loading: true } };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(Map({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: Map({
        [SECTION_ENUM.PRODUCTS]: Map({
          loading: true,
        }),
      }),
    }));
  });

  it('handles set products dropdown', () => {
    const initialState = Map({
      activeSection: null,
      dropdownContent: Map({}),
    });
    const action = {
      type: 'SET_PRODUCTS_DROPDOWN',
      payload: {
        productsMenu: {
          active: { level: 0, id: null },
          levels: { 0: {}, 1: {} },
        },
      },
    };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(fromJS({
      activeSection: null,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 0, id: null },
          levels: {
            0: {},
            1: {},
          },
        },
      },
    }));
  });

  it('handles set product category dropdown', () => {
    const initialState = fromJS({
      activeSection: null,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 1, id: 1 },
          loading: true,
          levels: {
            0: {},
            1: {},
          },
        },
      },
    });
    const action = {
      type: 'SET_PRODUCT_CATEGORY_DROPDOWN',
      payload: {
        categoryID: 1,
        categoryMenu: {
          content: 'test',
        },
      },
    };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(fromJS({
      activeSection: null,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 1, id: 1 },
          loading: false,
          levels: {
            0: {},
            1: {
              1: {
                content: 'test',
              },
            },
          },
        },
      },
    }));
  });

  it('handles set active level', () => {
    const initialState = fromJS({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: null, id: null },
          levels: {
            0: {},
            1: {},
          },
        },
      },
    });
    const action = { type: 'SET_ACTIVE_LEVEL', payload: { level: 1, id: 1 } };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(fromJS({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 1, id: 1 },
          levels: {
            0: {},
            1: {},
          },
        },
      },
    }));
  });

  it('handles set active preview', () => {
    const initialState = fromJS({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 1, id: 1 },
          levels: {
            0: {},
            1: {
              1: {
                activePreview: null,
              },
            },
          },
        },
      },
    });
    const action = { type: 'SET_ACTIVE_PREVIEW', payload: { preview: 1 } };
    const nextState = navbarReducer(initialState, action);

    expect(nextState).to.eql(fromJS({
      activeSection: SECTION_ENUM.PRODUCTS,
      dropdownContent: {
        [SECTION_ENUM.PRODUCTS]: {
          active: { level: 1, id: 1 },
          levels: {
            0: {},
            1: {
              1: {
                activePreview: 1,
              },
            },
          },
        },
      },
    }));
  });
});
