import React from 'react';
import BlogHeader from './blogHeader';
import BlogContent from './blogContent';

export default function Blog(){
    const content = {
        "title": "FIRE-RATED OPENINGS WITH ELECTRONIC ACCESS CONTROL AND LOW-ENERGY POWER OPERATORS",
        "date": "August 08 2019",
        "author": "Ginny Powell",
        "tags":['General', 'Hager Products', 'HS4', 'HS4 Electronic Access Control', 'locking devices', 'Products', 'school', 'security'],
        "commentCount": "0 comments",
        "content": "This article appears in this month’s issue of the DHI Door Security + Safety Magazine and was reprinted here with their permission."
    };
    return(
        <>
        <section className="hc-section">
            <div className="container-fluid">
                <BlogHeader content={content}/>
                <img className="blog-main-post-image" src="public/images/blog-main-image.jpg" alt="Fire-rated Openings with Electronic Access Control and Low-energy Power Operators"/>
                <BlogContent content={content.content} />
            </div>
        </section>
        </>
    );
}