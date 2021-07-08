import React from 'react';
import DocumentCard from './documentCard.jsx';

export default function DocumentCards({ itemArr, scrollTo }){
    if (itemArr !== undefined){
        var renderedList = [];

        for(let i = 0;i < itemArr.length;i++){
            const card = <DocumentCard key={itemArr[i].id} item={itemArr[i]} scrollTo={scrollTo} />
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
