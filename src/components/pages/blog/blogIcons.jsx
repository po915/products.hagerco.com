import React from 'react';

export default function BlogIcons({content}){
    return(
        <li>
            <img className="blog-meta-icon" src="/public/images/icon-head-login.svg"/>
                {content}
        </li>
    );
}