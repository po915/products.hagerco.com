/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../../state/StoreContext';
import Loading from '../../loading/loading';
import errorRedirect from '../../error/errorRedirect';
import HagerBreadcrumb from '../../../common/hagerBreadcrumb';
import ProductCertifications from './productCertifications';
import ProductApplications from './productApplications';
import ProductFunctions from './productFunctions';
import ProductAccessories from './productAccessories';
import ProductTabs from './productTabs';

export default function ProductItem({ match, location }) {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);

    function setCollapseDisplay(section, show) {
        dispatch({ type: 'SET_PRODUCT_ITEM_COLLAPSE_DISPLAY', payload: { section, show } });
    }

    function setActiveTab(tab) {
        dispatch({ type: 'SET_PRODUCT_ITEM_TAB_DISPLAY', payload: { tab } });
    }

    // Get item ID from route
    const itemID = match.params.id;
    if (itemID == null) {
        return errorRedirect(location);
    }

    // Fetch product details from Censhare after initial render
    useEffect(() => {
        dispatch({ type: 'SET_PRODUCT_ITEM_LOADING', payload: { loading: true } });
        actions.products.fetchItemDetails(itemID);
        dispatch({ type: 'SET_PRODUCT_ITEM_LOADING', payload: { loading: false } });

        // Clear out after exiting page
        return () => {
            dispatch({ type: 'SET_PRODUCT_ITEM_DETAILS', payload: { status: null, itemDetails: null } });
        };
    }, [itemID]);

    const productsState = state.get('products').toJS(); 

    if (productsState.status === null && !productsState.loading) {
        // Don't render anything if status is null and not loading (initial render/component unmount)
        return <></>;
    } else if (productsState.status === false) {
        // Redirect if not found
        return errorRedirect(location);
    } else if (productsState.loading) {
        // Show loading modal if loading
        document.title = 'Loading...';
        return <Loading />;
    }

    // Details fetched successfully, get item detail
    const item = productsState.itemDetail;

    const topLevelCategory = productsState.topLevelCategory;

    // Set document title from article
    document.title = item.name;

    // Use hash to set default active tab
    if (location.hash === '' && item.tab === undefined) {
        setActiveTab('specs');
    } else if (location.hash !== '' && item.tab === undefined) {
        setActiveTab(location.hash.replace('#', ''));
    }

    var mainImage = "/public/images/icon-search.svg";
    var images = [];

    if ( Object.prototype.hasOwnProperty.call(item, 'mainImages') && Object.prototype.hasOwnProperty.call(item, 'otherImages') ) {
        images = item.mainImages.concat(item.otherImages)
    } else if (Object.prototype.hasOwnProperty.call(item, 'mainImages')) {
        images = images.concat(item.mainImages);
    } else if (Object.prototype.hasOwnProperty.call(item, 'otherImages')) {
        images = images.concat(item.otherImages)
    } else {
        images = images.concat(mainImage)
    }

    var applications;

    if (item.productProperties && item.productProperties.applications) {
        applications = item.productProperties.applications
    } else {
        applications = null
    }

    var printSpecUrl = null;

    if (Object.prototype.hasOwnProperty.call(item, 'printSpec')) {
        if (item.printSpec.length) {
            printSpecUrl = item.printSpec[0].link
        }
    }

    var jobsUrl = "https://choosehager.com/my-hager/"

    return (
        <div className="container-fluid product-page-container">
            <HagerBreadcrumb path={item.breadcrumb} />
            <div className="row mb-5">
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
                    <ImageDisplayer images={images}/>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2">
                    <h1 className="red-bar-above display-2">{item.name}</h1>
                    <div className="container-fluid">
                        <ProductCertifications certifications={item.certifications} />
                    </div>
                    
                </div>
            </div>
            <ProductApplications applications={applications} />

            <p className="mb-5">
                {
                    printSpecUrl !== null &&
                    <button className="btn btn-primary mr-4" onClick={() => window.open(printSpecUrl, '_blank')}>Print Spec Page</button>
                }
                <button className="btn btn-primary" onClick={() => window.open(jobsUrl, '_blank')}>Add to Jobs</button>
            </p>

            <ProductTabs
                topLevelCategory={topLevelCategory}
                active={item.tab}
                setActiveTab={setActiveTab}
                specs={item.productProperties}
                cadDrawings={item.cad}
                sizeOptions={item.size}
                templates={item.templates}
                instructions={item.instructions}
                relatedFiles={item.relatedFiles}
                videos={item.videos}
                brochures={item.brochures}
                catalog={item.catalog}
                pricebook={item.priceBook}
            />
        </div>
    );
} 


function ImageDisplayer(props) {
    const { images } = props;
    const [selected, setSelected] = useState(0);

    const handleClick = (index) => {
        setSelected(index);
    }
    return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 no-padding">
            <div className="current-image-wrapper">
                <img className="current-image" src={images[selected]}/>
            </div>
            
            <div className="container-fluid no-padding">
                <h4>Other Images:</h4>
                <div className="row other-images container-fluid">
                    {
                        images.map((image, index) => (
                            <img className="gallery-image" key={index} src={image} onClick={e => handleClick(index)}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}