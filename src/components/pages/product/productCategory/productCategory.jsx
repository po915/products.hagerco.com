/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import { StoreContext } from '../../../../state/StoreContext';
import Loading from '../../loading/loading';
import errorRedirect from '../../error/errorRedirect';
import HagerBreadcrumb from '../../../common/hagerBreadcrumb';
import ProductCategoryCard from './productCategoryCard';
import ProductCards from './productCards';
import ProductItemCards from './productItemCards';
import ProductCard from './productCard';

export default function ProductCategory({ match, location }) {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);
    const productsState = state.get('products').toJS();
    var previous = null;
    // Get category ID from route
    const categoryID = match.params.id;

    if (categoryID == null) {
        return errorRedirect(location);
    }

    if (productsState.fromParent !== undefined && productsState.fromParent !== null) {
        previous = productsState.fromParent;
    } else if (location.state !== null && location.state !== undefined) {
        if (location.state.prevPath !== null && location.state.prevPath !== undefined) {
            previous = location.state.prevPath.replace("/productCategory/", "");
        }
    }

    // Fetch category details from Censhare
    useEffect(() => {
        actions.products.fetchCategoryDetails(categoryID, previous);
    }, [categoryID]);

    // Display loading modal if not loaded, or redirect if not found
    const category = productsState.categoryDetails;
    if (category === undefined) {
        return <Loading />;
    } else if (category === null) {
        return errorRedirect(location);
    }


    //display all children categories for category, need to get retrieve all items from 
    return (
        <>
            <section className="hc-section text-light" data-stellar-background-ratio=".5" style={{ backgroundImage: `url(.././public/images/room-1.jpg)` }}>
                <span className="overlay"></span>
                <div className="container-fluid">
                    <h1 className="red-bar-above mb-0">{category.name}</h1>
                    <p>{category.subtext}</p>
                    <div className="container-fluid">
                        <div className="row">
                            <FontAwesomeIcon icon={faInfoCircle} className="learn-more-icon"/>
                            <a href={getMoreInfoLink(category.name)}>
                                <h5 className="learn-more-link">Learn More</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hc-section">
                <div className="container-fluid">
                    <HagerBreadcrumb path={category.breadcrumb} />
                    {/* <h1 className="red-bar-above mb-5">{category.name}</h1> */}
                    {
                        category === null
                            ? <p> No products found for category </p>
                            : category.children !== undefined
                                ? <ListChildren childrenList={category.children} />
                                : <ListProducts id={category.id} />
                    }
                </div>
            </section>
        </>
    );
}

function ListChildren({ childrenList }) {
    var renderedList = [];
    
    renderedList = childrenList.map((index) =>
        <ProductCategoryCard key={index.id} category={index} />
    );
    return (
        <div className="row">
            {
                renderedList
            }
        </div>
    );
}

function ListProducts({ id }) {
    const { state, actions, ...rest } = useContext(StoreContext);
    const productsState = state.get('products').toJS();
    useEffect(() => {
        actions.products.fetchCategoryItems(id);
    }, [id]);
    const categoryItems = productsState.categoryItems;


    if (categoryItems === undefined) {
        return <Loading />;
    } else if (categoryItems === null) {
        return errorRedirect(id);
    }
    else {
        return (
            <ProductCards itemArr={categoryItems} />
        );
    }
}

function ListProduct({ item }) {
    if (item === undefined) {
        return <Loading />;
    } else if (item === null) {
        return errorRedirect(id);
    }
    return (
        <div className="row">
            <ProductItemCards item={item} />
        </div>
    );
}

function getMoreInfoLink(category) {
    switch (category) {
        case "Door Controls":
            return "https://choosehager.com/resources/product-information/door-controls/"
        case "Access Control":
            return "https://choosehager.com/resources/product-information"
        case "Commercial Hinges":
            return "https://choosehager.com/resources/product-information/commercial-hinges/"
        case "Door Controls":
            return "https://choosehager.com/resources/product-information/door-controls/"
        case "Electrified":
            return "https://choosehager.com/resources/product-information/electrified-solutions/"
        case "Euroline":
            return "https://choosehager.com/resources/product-information/euroline/"
        case "Exit Devices":
            return "https://choosehager.com/resources/product-information/exit-devices/"
        case "Locks":
            return "https://choosehager.com/resources/product-information/locks/"
        case "Residential Hinges":
            return "https://choosehager.com/resources/product-information/residential-hinges/"
        case "Roton":
            return "https://choosehager.com/resources/product-information/roton-continuous-geared-hinges/"
        case "Sliding Door Hardware":
            return "https://choosehager.com/resources/product-information/sliding-door-hardware/"
        case "Stainless Steel Continuous Hinges":
            return "https://choosehager.com/resources/product-information/stainless-steel-continuous-hinges/"
        case "Thresholds and Weatherstripping":
            return "https://choosehager.com/resources/product-information/"
        case "Trim & Auxiliary":
            return "https://choosehager.com/resources/product-information/" 
        default:
            return "https://choosehager.com/resources/product-information/"
    }
}
