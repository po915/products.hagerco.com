import React from 'react';
import ListofHS4 from './listOfHS4';

export default function moreInfo(){
    return(
        <div>
        <section className="hc-section text-center text-light" data-stellar-background-ratio=".5" style={{backgroundImage: 'url(/public/images/card-lock.jpg)'}}>
            <span className="overlay"></span>
                <div className="container-fluid py-5">
                    <h1>
                        HOW IT WORKS
                    </h1>
                    <strong>
                        The HS4 Access Control solution is elegantly and cleverly designed allowing hte user to choose the level of control they need.
                    </strong>
                </div>
        </section>
        <ListofHS4 />
        </div>
    );
}