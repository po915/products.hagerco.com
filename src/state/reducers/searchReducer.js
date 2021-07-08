import { fromJS } from 'immutable';

function setProductSearchResult(searchState, payload) {
    return searchState.set('productResults', payload);
}

function setDocumentSearchResult(searchState, payload) {
    return searchState.set('documentResults', payload);
}

function setSearchTerm(searchState, payload) {
    return searchState.set('term', payload);
}

function setIsHidden(searchState, payload) {
    return searchState.set('isHidden', payload);
}

function setIsMinimize(searchState, payload) {
    return searchState.set('isMinimize', payload);
}

export default function searchReducer(searchState, action) {
    switch (action.type) {
        case 'SET_PRODUCT_SEARCH_RESULT':
            return setProductSearchResult(searchState, action.payload);
        case 'SET_DOCUMENT_SEARCH_RESULT':
            return setDocumentSearchResult(searchState, action.payload);
        case 'SET_SEARCH_TERM':
            return setSearchTerm(searchState, action.payload);
        case 'SET_SEARCH_HIDDEN':
            return setIsHidden(searchState, action.payload);
        case 'SET_SEARCH_MINIMIZE':
            return setIsMinimize(searchState, action.payload);
        default:
            return searchState;
    }
}
