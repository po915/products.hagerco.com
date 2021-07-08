import React from 'react';

export default function ProductCertifications({ certifications }) {
    if (typeof certifications === 'undefined') {
        return <></>
    }

    return (
        <div className="row">
            {
                certifications.map((image, index) => {
                    return <img className="mr-1 certification-image" key={index} src={image.thumbnail.downloadLink} alt={image.name}></img>
                })
            }
        </div>
    );
}
