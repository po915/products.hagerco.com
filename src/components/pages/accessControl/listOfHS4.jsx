import React from 'react';
import HagerBreadcrumb from '../../common/hagerBreadcrumb';
import ArrowContent from './arrowContent';
import * as routes from '../../routes';

export default function listofHS4(){
    let previousLink = [
        'access-control'
    ]
    return(
        <section className="hc-section">
            <div className="container-fluid">
                <HagerBreadcrumb 
                    path={previousLink}
                />
            </div>
            <ArrowContent />
        </section>
    );
}

/* To render content from the API consult JSON for the asset name, then use contentRenderer to render the XML portion of the richText */