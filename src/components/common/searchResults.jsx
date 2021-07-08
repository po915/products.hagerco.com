import React, { useContext, useEffect, useRef } from 'react';

import { StoreContext } from '../../state/StoreContext';
import ProductCards from '../pages/product/productCategory/productCards';
import DocumentCards from '../pages/product/productCategory/documentCards';

export default function SearchResults() {
    const { state, dispatch, actions } = useContext(StoreContext);
    const scrollToEl = useRef(null)

    const searchState = state.get('search').toJS();

    const isHidden = searchState.isHidden

    const isMinimize = searchState.isMinimize

    const executeScroll = () => scrollToEl.current.scrollIntoView()

    function onHide() {
        actions.search.hideSearch()
    }

    function onMinimize() {
        if (isMinimize) {
            actions.search.minimizeSearch(false)
        } else {
            actions.search.minimizeSearch(true)
        }
        
    }

    return (
        <>
            {
                isHidden === false &&
                <div className="container-fluid search">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h3 className="search-heading">
                                Search results for "{searchState.term}"
                            </h3>
                        </div>
                        {/* <div className="col-2">
                            <button class="btn btn-primary float-right" type="submit">Hide Results</button>
                        </div> */}
                        <div className="col-12 col-md-4">
                            <button className="btn btn-primary float-right search-button" type="submit" onClick={onMinimize}>{isMinimize ? 'Expand' : 'Minimize'} Results</button>
                            <button className="btn btn-primary float-right search-button" type="submit" onClick={onHide}>Close</button>
                        </div>
                    </div>
                    { 
                        isMinimize === false &&
                        <div>
                            <div>
                                <h4>Documents</h4>
                                <div className="search-tiles">
                                    {   searchState.documentResults.length ?
                                        <DocumentCards itemArr={searchState.documentResults}/>
                                        : <h4>No results...</h4>
                                    }
                                    
                                </div>
                            </div>
                            <div>
                                <h4>Products</h4>
                                <div className="search-tiles">
                                    {   searchState.productResults.length ?
                                        <ProductCards itemArr={searchState.productResults} scrollTo={executeScroll}/>
                                        : <h4>No results...</h4>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    }
                    <hr ref={scrollToEl}></hr>
                </div>
                
            }
        </>

    )
}