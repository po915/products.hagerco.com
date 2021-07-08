import React from 'react';

export default function BlogContent({content}){
    return(
        <>
        <p>
            {content}
        </p>
        <a className="btn btn-primary mt-3" href="#">Read More</a>
        </>
    );
}