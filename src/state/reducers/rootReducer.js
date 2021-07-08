/*
  rootReducer defines the root state + initialization methods.
  Reducer composition is used to split reducers into respective domains.

  Structure:
  ---
  state
    auth
    home
    navbar
    products
*/

import { fromJS } from 'immutable';
import authReducer from './authReducer';
import distributorReducer from './distributorReducer';
import repsReducer from './repsReducer';
import homeReducer from './homeReducer';
import navbarReducer from './navbarReducer';
import productsReducer from './productsReducer';
import contentReducer from './contentReducer';
import accessControlReducer from './accessControlReducer';
import mapReducer from './mapReducer';
import searchReducer from './searchReducer';


// Initial state definition. Grab from session storage, otherwise initialize to default value
const defaultInitialState = fromJS({
    auth: {
        isLoggedIn: false,
    },
    distributors: {
        list: null,
        searchTerm: null
    },
    reps: {
        list: null,
        searchTerm: null
    },
    home: {},
    navbar: {
        activeSection: null,
        dropdownContent: {},
    },
    products: {
        status: null,
    },
    content: {
        status: null,
    },
    accessControl: {
        show: false
    },
    map: {
        position: null,
        locations: null,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        placeData: {},
        center: { lat: 37.335277, lng: -121.853260 },
        fetch: false
    },
    search: {
        productResults: [],
        documentResults: [],
        term: "",
        isHidden: true,
        isMinimize: false,
    }
});
// const serializedState = window.localStorage.getItem('state');
// const initialState = serializedState != null ? JSON.parse(serializedState) : defaultInitialState;
const initialState = defaultInitialState;

// rootReducer is used to handle actions dispatched to StoreContext
function rootReducer(state = initialState, action) {
    // console.log(action.type); // TODO DEBUG
    return fromJS({
        auth: authReducer(state.get('auth'), action),
        distributors: distributorReducer(state.get('distributors'), action),
        reps: repsReducer(state.get('reps'), action),
        home: homeReducer(state.get('home'), action),
        navbar: navbarReducer(state.get('navbar'), action),
        products: productsReducer(state.get('products'), action),
        content: contentReducer(state.get('content'), action),
        accessControl: accessControlReducer(state.get('accessControl'), action),
        map: mapReducer(state.get('map'), action),
        search: searchReducer(state.get('search'), action)
    });
}

export { initialState, rootReducer };
