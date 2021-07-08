/*
  distributorReducer handles state corresponding to the distributor page

  Structure:
  ---
  state
    distributors
*/

import { fromJS } from 'immutable';

function setDistributors(distributorState, payload) {
    return distributorState.set('list', fromJS(payload.distributors));
}

function setSearchTerm(distributorState, payload) {
    return distributorState.set('searchTerm', payload.term);
}

export default function distributorReducer(distributorState, action) {
    // console.log(action);
    switch (action.type) {
        case 'SET_DISTRIBUTORS':
            return setDistributors(distributorState, action.payload);
        case 'SET_SEARCH_TERM':
            return setSearchTerm(distributorState, action.payload);
        default:
            return distributorState;
    }
}
