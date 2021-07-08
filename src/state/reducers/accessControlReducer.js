function toggleProducts(accessState, payload){
    return accessState.set('show', payload.show);
}

export default function accessControlReducer(accessState, action){
    switch (action.type){
        case 'TOGGLE_PRODUCTS':
            return toggleProducts(accessState, action.payload);
        default:
            return accessState;
    }
}