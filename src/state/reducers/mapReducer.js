function setLocation(mapState, payload){
    return mapState.set('locations', payload.locations);
}

export default function mapReducer(mapState, action){
    switch (action.type){
        case 'SET_LOCATION':
            return setLocation(mapState, action.payload);
        default:
            return mapState;
    }
}