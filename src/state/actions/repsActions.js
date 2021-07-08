export default function RepsActions(state, dispatch, backend) {

    const fetchReps = async () => {
        try {
            var reps = await backend.reps.getReps();
            reps = reps.result.map(item => {
                delete item.residentialZip
                delete item.commercialZip
                return item
            })
            dispatch({ type: 'SET_REPS', payload: { reps: reps } });
        } catch (e) {
            dispatch({ type: 'SET_REPS', payload: { reps: null } });
        }
    };

    const setSearchTerm = (search) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: { term: search } });
    }

    const setZipcode = (zipcode) => {
        dispatch({ type: 'SET_REPS_ZIPCODE', payload: { zipcode: zipcode } });
    }

    const searchReps = async (zipcode) => {
        try {
            var filter = [];
            var response = await backend.reps.searchReps(zipcode)

            if (response.result) {
                response.result.forEach(result => {
                    var tmp = []
                    if (result.commercialZip) {
                        tmp = tmp.concat(result.commercialZip)
                    }
                    if (result.residentialZip) {
                        tmp = tmp.concat(result.residentialZip)
                    }
                    filter = filter.concat(tmp)
                })
                filter = filter.map(item => item.id)
        
                filter = [...new Set(filter)];
                dispatch({ type: 'SET_REPS_FILTER', payload: { filter: filter } });
            }
        } catch (e) {
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results: null } });
        }
    }

    return {
        fetchReps,
        setSearchTerm,
        setZipcode,
        searchReps
    };
}

