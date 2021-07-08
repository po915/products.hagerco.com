import React, { createContext, useReducer, useEffect } from 'react';
import { initialState, rootReducer } from './reducers/rootReducer';
import useActions from './actions/actions';

const StoreContext = createContext(initialState);

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
    // Get state and dispatch from Reacts new API useReducer.
    const [state, dispatch] = useReducer(rootReducer, initialState);

    // Create an object of all our actions, handling cases where a simple dispatch is too primitive
    const actions = useActions(state, dispatch);

    // Log new state
    useEffect(() => {
        // console.log(state.toJS());
    }, [state]); // TODO Debug

    // Persist state to local storage
    useEffect(() => {
        window.localStorage.setItem('state', JSON.stringify(state));
    });

    // Render state, dispatch and special case actions
    return (
        <StoreContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };
