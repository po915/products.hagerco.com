import React from 'react';

export default function BlogTitle({content}){
    return(
        <h1 className="red-bar-above text-uppercase">
                {content}
        </h1>
    );
}