import React, { useEffect, useContext } from 'react';

export default function DocumentCard({ item }){

    return(
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
            <div className="document-card card">
                <div className="document-card-link-wrapper">
                    <span className="card-link"><a href={item.downloadLink} target="_blank">{item.description ? item.description : item.name}</a></span>
                </div>
            </div>
        </div>
    )
}

