import React, {useContext} from 'react';
import ElectronicAccessControl from './electronicAccessControl';
import ViewMoreProducts from './viewMoreProducts';
import { HowItWorks, Hs4Images, Hs4Info } from './howItWorks';
import { StoreContext } from '../../../state/StoreContext';
import * as routes from '../../routes';


export default function AccessControl() {
    const {state, actions, dispatch, ...rest} = useContext(StoreContext);
    const accessState = state.get('accessControl').toJS();

    function setCollapseDisplay(section, show) {
        dispatch({type: 'TOGGLE_PRODUCTS', payload: {section, show}});
    }

    const show = accessState.show
    return (
    <>
    <ElectronicAccessControl />
    <section className="hc-section">
        <div className="container-fluid">
            <p className='mb-5'>
            HS4 combines the largest portfolio of access control products under a single software system. From readers to cylindrical locks, mortise locks, deadbolts, padlocks, locker locks and cam locks, every opening in a building can be secured seamlessly, using a wide variety of credentials.
            </p>
            <ViewMoreProducts
                show={show}
                setCollapseDisplay={setCollapseDisplay} />
            <HowItWorks
                src="/public/images/card-lock.jpg"
                title="Access Control"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                href={routes.ACCESS_CONTROL_DETAILS}
            />
            <div className="row">
                <Hs4Images
                    image="/public/images/knob-1.jpg"
                    colWidth="6"
                />
                <Hs4Images
                    image="/public/images/knob-1.jpg"
                    colWidth="6"
                />
            </div>
            <div className="row d-flex align-items-stretch">
                <Hs4Info
                    colWidth="6"
                    title="Benefits"
                    content="HS4 provides the ability to manage up to 65,000 openings and 4 million users in a single software package. From a small commercial office environment to a large institutional facility HS4 enables both virtual and real-time monitoring to meet the diverse needs of today’s access control managers. Audit trails can be collected seamlessly whichever platform is being utilized."
                />
                <Hs4Info
                    colWidth="6"
                    title="Training"
                    content="Hager Companies offers three levels of authorization training. For more information please contact your local representative or email."
                />
            </div>
        </div>
    </section>
    </>
    );
}
