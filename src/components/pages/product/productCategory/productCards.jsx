import React from 'react';
import ProductCard from './productCard.jsx';

export default function ProductCards({ itemArr, scrollTo }){
    if (itemArr !== undefined){
        var renderedList = [];

        for(let i = 0;i < itemArr.length;i++){
            const card = <ProductCard key={itemArr[i].id} item={itemArr[i]} scrollTo={scrollTo} />
            renderedList.push(card);
        }
    }
    return (
        <div className = "row">
            {
                renderedList
            }
        </div>
    );
}
