export default function mapActions(state, dispatch, backend){
    const fetchLocations = async (id)=>{
        try{
            const locations = await backend.location.getLocationDetails(id)

            dispatch({type: 'SET_LOCATIONS', payload: {locations}})

        }catch(e){
            dispatch({type: 'SET_LOCATIONS', payload: {locations: null}})
        }
    }
    return(
        fetchLocations
    )
}