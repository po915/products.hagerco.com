import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map, List } from 'immutable';
import productsReducer from '../src/state/reducers/productsReducer';

describe('productsReducer', () => {
  it('handles set product item loading true action', () => {
    const initialState = Map({
      status: null,
    });
    const action = { type: 'SET_PRODUCT_ITEM_LOADING', payload: { loading: true } };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: null,
      loading: true,
    }));
  });

  it('handles set product item loading false action', () => {
    const initialState = Map({
      loading: true,
    });
    const action = { type: 'SET_PRODUCT_ITEM_LOADING', payload: { loading: false } };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      loading: false,
    }));
  });

  it('handles set product item details action with successful fetch', () => {
    const initialState = Map({
      status: null,
    });
    const payload = {
      status: true,
      itemDetails: {
        name: 'Test Product',
      },
    };
    const action = { type: 'SET_PRODUCT_ITEM_DETAILS', payload };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: true,
      itemDetail: Map({
        name: 'Test Product',
      }),
    }));
  });

  it('handles set product item details action with unsuccessful fetch', () => {
    const initialState = Map({
      status: null,
    });
    const action = { type: 'SET_PRODUCT_ITEM_DETAILS', payload: { status: false, itemDetails: null } };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: false,
    }));
  });

  it('handles set product item details action with null payload (clear)', () => {
    const initialState = Map({
      status: true,
      itemDetail: Map({
        name: 'Test Product',
      }),
    });
    const action = { type: 'SET_PRODUCT_ITEM_DETAILS', payload: { status: null, itemDetails: null } };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      status: null,
    }));
  });

  it('handles set product item collapse display action', () => {
    const initialState = Map({
      itemDetail: Map({
        showAccessories: false,
        showFunctions: false,
      }),
    });
    const action = {
      type: 'SET_PRODUCT_ITEM_COLLAPSE_DISPLAY',
      payload: {
        section: 'accessories',
        show: true,
      },
    };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      itemDetail: Map({
        showAccessories: true,
        showFunctions: false,
      }),
    }));
  });

  it('handles set product item tab display action', () => {
    const initialState = Map({
      itemDetail: Map({
        tab: 'specs',
      }),
    });
    const action = {
      type: 'SET_PRODUCT_ITEM_TAB_DISPLAY',
      payload: {
        tab: 'templates',
      },
    };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      itemDetail: Map({
        tab: 'templates',
      }),
    }));
  });

  it('handles set product categories action with successful fetch', () => {
    const initialState = Map({});
    const payload = {
      categories: ['Test Category 1', 'Test Category 2', 'Test Category 3'],
    };
    const action = { type: 'SET_PRODUCT_CATEGORIES', payload };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      categories: List.of('Test Category 1', 'Test Category 2', 'Test Category 3'),
    }));
  });

  it('handles set parent categories and image action with successful fetch', () => {
      const initialState = Map({});
      const payload = {
          parentCategories: ['Test', 'Test2', 'Test3'],
      };
      const action = { type: 'SET_PARENT_PRODUCT_CATEGORIES', payload };
      const nextState = productsReducer(initialState, action);

      expect(nextState).to.eql(Map({
          parentCategories: List.of('Test', 'Test2','Test3'),
      }));
  });

  it('handles product Items with successful fetch', () => {
      const initialState = Map({});
      const payload = {
          productItems: ['Test', 'Test2', 'Test3'],
      };
      const action = {type: 'SET_PRODUCT_ITEMS', payload };

      const nextState = productsReducer(initialState, action);

      expect(nextState).to.eql(Map({
          productItems: List.of('Test', 'Test2','Test3')
      }));
  });

  it('handles set product category details action with successful fetch', () => {
    const initialState = Map({});
    const payload = {
      categoryDetails: {
        name: 'Test Category',
      },
    };
    const action = { type: 'SET_PRODUCT_CATEGORY_DETAILS', payload };
    const nextState = productsReducer(initialState, action);

    expect(nextState).to.eql(Map({
      categoryDetails: Map({
        name: 'Test Category',
      }),
    }));
  });
});
