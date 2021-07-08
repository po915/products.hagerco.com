export default function DistributorActions(state, dispatch, backend) {

    const fetchDistributors = async () => {
        try {
            const distributors = await backend.distributors.getDistributors();
            dispatch({ type: 'SET_DISTRIBUTORS', payload: { distributors: distributors.result } });
        } catch (e) {
            dispatch({ type: 'SET_DISTRIBUTORS', payload: { distributors: null } });
        }
    };

    const setSearchTerm = (search) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: { term: search } });
    }

    return {
        fetchDistributors,
        setSearchTerm
    };
}

