import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ProductSpecs from './productSpecs';
import ProductTemplates from './productTemplates';
import ProductInstallInstructions from './productInstallInstructions';
import ProductRelatedFiles from './productRelatedFiles';
import ProductVideos from './productVideos';
import CadDrawings from './productCadDrawings';
import SizeOptions from './productSizeOptions';
// import ProductBrochures from './productBrochures';
// import ProductCatalog from './productCatalog';
// import ProductPriceBook from './productPriceBook';

export default function ProductTabs({
    topLevelCategory,
    active,
    setActiveTab,
    specs,
    cadDrawings,
    sizeOptions,
    templates,
    instructions,
    relatedFiles,
    videos,
    brochures,
    catalog,
    priceBook,
}) {
    function setActiveClass(section) {
        return `${active === section ? 'active' : ''}`;
    }
    

    const tabMap = [
        { name: 'Specs', id: 'specs', component: ProductSpecs, prop: { specs, topLevelCategory }},
        { name: 'Templates', id: 'templates', component: ProductTemplates, prop: templates },
        { name: 'Installation Instructions', id: 'install', component: ProductInstallInstructions, prop: instructions },
        { name: 'CAD Drawings', id: 'cad', component: CadDrawings, prop: cadDrawings },
        { name: 'Size Options', id: 'size', component: SizeOptions, prop: sizeOptions },
        { name: 'Related Files', id: 'related', component: ProductRelatedFiles, prop: relatedFiles },
        { name: 'Videos', id: 'videos', component: ProductVideos, prop: videos },
        // { name: 'Brochures', id: 'brochures', component: ProductBrochures, prop: brochures },
        // { name: 'Catalog', id: 'catalog', component: ProductCatalog, prop: catalog },
        // { name: 'Price Book', id: 'pricebook', component: ProductPriceBook, prop: priceBook },
    ];

    return (
        <>
            <Nav tabs>
                {
                    tabMap.map(tab => { 
                        if (tab.prop) {
                            return (
                                <NavItem key={tab.id}>
                                    <NavLink href={`#${tab.id}`} className={setActiveClass(tab.id)} onClick={() => setActiveTab(tab.id)}>
                                        {tab.name}
                                    </NavLink>
                                </NavItem>
                            )
                        } else {
                            return;
                        } 
                            
                    })
                }
            </Nav>
            <TabContent id="nav-tabContent" activeTab={active}>
                {
                    // eslint-disable-next-line max-len
                    tabMap.map(tab => {
                        if (tab.prop) {
                            return (
                                <ProductTab key={tab.id} data={tab.prop} component={tab.component} id={tab.id} tabID={tab.id} />
                            )
                        } else {
                            return;
                        }
                    })
                }
            </TabContent>
        </>
    );
}

// Higher-Order Component to wrap tab panes
function ProductTab({ component: Component, id, tabID, ...rest }) {
    // console.log(data)
    return (
        <TabPane id={id} tabId={tabID}>
            <Component {...rest} />
        </TabPane>
    );
}
