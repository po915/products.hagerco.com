import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../../../routes';
import { StoreContext } from '../../../../state/StoreContext';

export default function ProductCard({ item, scrollTo }){
    var href = routes.PRODUCT_ITEM.replace(':id',item.id);
    return(
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
            <Link to={href}>
                <div className="product-card card" onClick={scrollTo}>
                    <div className="card-image-wrapper">
                        <img className="product-card-img" src={ item.mainImages !== undefined ? item.mainImages[0] : "/public/images/icon-search.svg"}></img>
                    </div>
                    <hr className="product-card-hr"></hr>
                    <div className="product-card-link-wrapper">
                        <span className="card-link">{item.name}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

