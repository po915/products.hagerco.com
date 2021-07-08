import React, { useContext } from 'react';
import DistributorHeader from './distributorHeader';
import { MapPane } from './mapPane';
import { StoreContext } from '../../../state/StoreContext';

export default function Distributors() {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);

    return (
        <>
            <section className="hc-section">
                <div className="container-fluid">
                    <DistributorHeader />
                    <MapPane fetchPlaces={actions.distributors.fetchDistributors} stateKey='distributors'/>
                </div>
            </section>
        </>
    );
}