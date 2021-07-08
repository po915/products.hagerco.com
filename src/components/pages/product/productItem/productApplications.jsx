/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function ProductApplications({ applications }) {

    var applicationsList = [];

    if (typeof applications === 'string') {
        const appList = applications.split('\n');

        appList.forEach((value, index) => {
            if (value.length) {
                applicationsList.push(<li key={index}>{value}</li>)
            }
        })
    }
    return (
        <>
            { applicationsList.length > 0 &&
                <div>
                    <h3>Applications</h3>
                    <ul className="mb-5">
                        {applicationsList}
                    </ul>
                </div>
            }
        </>
    );
}
