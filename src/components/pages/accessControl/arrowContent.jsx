import React from 'react';
import {Link} from 'react-router-dom';

export default function ArrowContent(){
    return(
        <div className="ac-content">
            <h3 className="ac-arrow"><Link className="hc-card-image-wrapper" to="#">Platforms</Link></h3>
            <p>
            The HS4 system supports several platform types including standalone, virtually networked, wired and wireless, all of which can be managed under one software package. Whether real-time monitoring or virtually networked locks are needed, the HS4 portfolio allows individual openings to be created.
            </p>
            <h3 className="ac-arrow"><Link className="hc-card-image-wrapper" to="#">Smart Credentials</Link></h3>
            <p>
            Using the latest Miafare and Miafare DESire technology, our credentials are encrypted using AES 128 Bit technology. They are available in multiple varieties such as cards, fobs and bracelets.
            </p>
            <h3 className="ac-arrow"><Link className="hc-card-image-wrapper" to="#">Software</Link> 
            </h3>
            <p>
            ProAccess SPACE allows the end user to choose the level of management required to suit the building needs. If in the future, a higher level of security is needed the system can be easily upgraded. Once you buy the system, you own the system. No annual maintenance fees are required.
            </p>
        </div>
    );
}