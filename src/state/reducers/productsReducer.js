/*
  productsResducer handles state corresponding to the proudct pages

  Structure:
  ---
  state
    products
      categories
      categoryDetail
      itemDetail
*/

import { fromJS, List } from 'immutable';

// setProductLoading sets the loading state and resets the status state
function setProductLoading(productsState, payload) {
    if (payload.loading === true) {
        return productsState.set('loading', true).set('status', null);
    } else if (payload.loading === false) {
        return productsState.set('loading', false);
    }
    return productsState;
}

function setProductItemDetails(productsState, payload) {
    if (payload.status === false) {
        return productsState.set('status', false);
    } else if (payload.status === null) {
        return productsState.clear().set('status', null);
    }
    return productsState.set('status', true).set('itemDetail', fromJS(payload.itemDetails));
}

function setProductItemTopLevelCategory(productsState, payload) {
    return productsState.set('topLevelCategory', fromJS(payload));
}

function setProductItemCertImages(productsState, payload) {
    return productsState.set('certifications', fromJS(payload));
}

function setProductItemCollapseDisplay(productsState, payload) {
    if (payload.section === 'accessories') {
        return productsState.setIn(['itemDetail', 'showAccessories'], payload.show);
    } else if (payload.section === 'functions') {
        return productsState.setIn(['itemDetail', 'showFunctions'], payload.show);
    }
    return productsState;
}
function setProductItemTabDisplay(productsState, payload) {
    return productsState.setIn(['itemDetail', 'tab'], payload.tab);
}

function setProductCategories(productsState, payload) {
    return productsState.set('categories', fromJS(payload.categories));
}

function setParentProductCategories(productsState, payload) {
    return productsState.set('parentCategories', fromJS(payload.parentCategories));
}

function setProductCategoryDetails(productsState, payload) {
    return productsState.set('categoryDetails', fromJS(payload.categoryDetails));
}

function setBreadCrumb(productsState, payload) {
    return productsState.set('fromParent', fromJS(payload.breadcrumb));
}

function setCategoryItems(productsState, payload) {
    return productsState.set('categoryItems', fromJS(payload.categoryItems));
}
function setProductItems(productsState, payload) {
    return productsState.set('productItems', fromJS(payload.productItems));
}
// productsReducer uses composer reduction to break products state reducer to its own function
export default function productsReducer(productsState, action) {
    switch (action.type) {
        case 'SET_PRODUCT_ITEM_LOADING':
            return setProductLoading(productsState, action.payload);
        case 'SET_PRODUCT_ITEM_DETAILS':
            return setProductItemDetails(productsState, action.payload);
        case 'SET_PRODUCT_ITEM_TOP_LEVEL_CATEGORY':
            return setProductItemTopLevelCategory(productsState, action.payload);
        case 'SET_PRODUCT_ITEM_CERT_IMAGES':
            return setProductItemCertImages(productsState, action.payload);
        case 'SET_PRODUCT_ITEM_COLLAPSE_DISPLAY':
            return setProductItemCollapseDisplay(productsState, action.payload);
        case 'SET_PRODUCT_ITEM_TAB_DISPLAY':
            return setProductItemTabDisplay(productsState, action.payload);
        case 'SET_PRODUCT_CATEGORIES':
            return setProductCategories(productsState, action.payload);
        case 'SET_PARENT_PRODUCT_CATEGORIES':
            return setParentProductCategories(productsState, action.payload);
        case 'SET_PRODUCT_CATEGORY_DETAILS':
            return setProductCategoryDetails(productsState, action.payload);
        case 'SET_CATEGORY_ITEMS':
            return setCategoryItems(productsState, action.payload);
        case 'SET_PRODUCT_ITEMS':
            return setProductItems(productsState, action.payload);
        case 'SET_BREADCRUMB':
            return setBreadCrumb(productsState, action.payload)
        default:
            return productsState;
    }
}
