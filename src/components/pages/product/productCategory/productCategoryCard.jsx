import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../routes';

export default function ProductCategoryCard({ category }) {
    var href = routes.PRODUCT_CATEGORY.replace(':id', category.id);
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
            <Link to={href}>
            <div className="product-card card">
                <div className="card-image-wrapper">
                    <img className="product-card-img" src={category.mainImages !== undefined ? category.mainImages[0] : "/public/images/icon-search.svg"} />
                </div>
                <hr className="product-card-hr"></hr>
                <div className="product-card-link-wrapper">
                    <span className="card-link">{category.name}</span>
                </div>
            </div>
            </Link>
        </div>
    );
}