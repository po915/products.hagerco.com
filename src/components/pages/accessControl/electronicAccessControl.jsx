import React from 'react';

/* For now, this is placeholder information until the HCMS API is up and running. Most likely use Content component to populate information */
export default function ElectronicAccessControl(){
    return (
        <section className="hc-section text-light mb-5" data-stellar-background-ratio=".5" style={{backgroundImage: 'url(/public/images/room-1.jpg)'}}>
            <span className="overlay"></span>
            <div className="container-fluid">
                <h1 className="red-bar-above">Electronic Access Control</h1>
                    <p>At Hager, our goal is to always give our customers the products they need to meet and surpass the challenges they face. It’s why we go the extra mile to design and manufacture innovative solutions using the latest technologies in order to meet those requirements, both now and in the future.</p>
                    <p>Introducing Hager powered by Salto: an electronic access control line that provides customizable, dynamic and value driven security solutions for practically every application.</p>
                <img className="access-control-products" src="/public/images/ac-devices.png"/>
            </div>
        </section>
    );
}
