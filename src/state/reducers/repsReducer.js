/*
  distributorReducer handles state corresponding to the distributor page

  Structure:
  ---
  state
    distributors
*/

import { fromJS } from 'immutable';

function setReps(repsState, payload) {
    return repsState.set('list', fromJS(payload.reps));
}

function setSearchTerm(repsState, payload) {
    return repsState.set('searchTerm', payload.term);
}

function setRepsZipcode(repsState, payload) {
    return repsState.set('zipcode', payload.zipcode);
}

function setSearchResults(repsState, payload) {
    return repsState.set('searchResults', payload.results)
}

function setRepsFilter(repsState, payload) {
    return repsState.set('repsFilter', payload.filter)
}

export default function repsReducer(repsState, action) {
    switch (action.type) {
        case 'SET_REPS':
            return setReps(repsState, action.payload);
        case 'SET_SEARCH_TERM':
            return setSearchTerm(repsState, action.payload);
        case 'SET_REPS_ZIPCODE':
            return setRepsZipcode(repsState, action.payload);
        case 'SET_SEARCH_RESULTS':
            return setSearchResults(repsState, action.payload);
        case 'SET_REPS_FILTER':
            return setRepsFilter(repsState, action.payload);
        default:
            return repsState;
    }
}
