import React from 'react';
import BlogIcons from './blogIcons';
import BlogTitle from './blogTitle';



export default function BlogHeader({content}){
    return(
        <div className="blog-main-post">
            <BlogTitle content={content.title} /> 
            <ul className="blog-meta list-unstyled">
                <BlogIcons content={content.date} />
                <BlogIcons content={content.author} />
                <BlogIcons content={content.commentCount} />
            </ul>
            <p><small>{content.tags.map((value, index) => {
                        return index != content.tags.length-1 ? <a key={index} href="#">{value}, </a>: <a key={index} href="#">{value}</a>
            })}</small></p>
        </div>
    );
}