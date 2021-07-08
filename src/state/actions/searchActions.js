export default function searchActions(state, dispatch, backend) {
    async function searchForTerm(term) {

        dispatch({ type: 'SET_SEARCH_TERM', payload: term });

        dispatch({ type: 'SET_SEARCH_MINIMIZE', payload: false });
        dispatch({ type: 'SET_SEARCH_HIDDEN', payload: false });

        const productResponse = await backend.search.searchProducts(term);

        const documentResponse = await backend.search.searchDocuments(term);

        dispatch({ type: 'SET_PRODUCT_SEARCH_RESULT', payload: productResponse.result });
        dispatch({ type: 'SET_DOCUMENT_SEARCH_RESULT', payload: documentResponse.result });
    }

    function hideSearch() {
        dispatch({ type: 'SET_SEARCH_HIDDEN', payload: true });
    }

    function minimizeSearch(value) {
        dispatch({ type: 'SET_SEARCH_MINIMIZE', payload: value });
    }

    return {
        searchForTerm,
        hideSearch,
        minimizeSearch
    };

}