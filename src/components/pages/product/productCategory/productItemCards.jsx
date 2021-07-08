import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../../../../state/StoreContext';
import ProductCategoryCard from './productCategoryCard';
import Loading from '../../loading/loading';

export default function ProductItemCards({item}){
    const {state, actions, ...rest} = useContext(StoreContext);
    const xlinkRegex = "https://onlinechannel.hagerco.com/hcms/v1.11/entity/productItem/";
    const product = state.get('products').toJS();
    for (let i = 0;i < product.categoryItems[0].productItems.length;i++){
        // console.log(product.categoryItems[0].productItems[i].match(xlinkRegex));
        if (product.categoryItems[0].productItems[i].match(xlinkRegex)){
            product.categoryItems[0].productItems[i] = product.categoryItems[0].productItems[i].replace(xlinkRegex, '');
        }
    }


    // console.log(product.categoryItems[0].productItems);
    useEffect(() => {
        actions.products.fetchProductItems(product.categoryItems[0].productItems);
    }, []);
    
    
    // console.log(product);
    
    var renderedList = product.productItems.map((index) => {
        <ProductItemCard key = {index.id} item = {index} />
    });
    return(
        <div className = "row">
            {
                renderedList
            }
        </div>
    );
}

function ProductItemCard({item}){

}

