import React, { useContext } from 'react';
import RepsHeader from './repsHeader';
import { RepsMapPane } from '../distributor/mapPane';
import { StoreContext } from '../../../state/StoreContext';


export default function Reps() {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);

    return (
        <>
            <section className="hc-section">
                <div className="container-fluid">
                    <RepsHeader />
                    <RepsMapPane fetchPlaces={actions.reps.fetchReps} stateKey='reps'/>
                </div>
            </section>
        </>
    );
}
