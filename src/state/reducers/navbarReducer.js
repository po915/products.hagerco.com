/*
  navbarReducer handles state corresponding to the navbar and associated dropdown menus.

  Structure:
  ---
  state
    navbar
      activesection
      products
        activelevel
        levels
          title
          image
          links
*/

import { fromJS } from 'immutable';
import { SECTION_ENUM } from '../../util';

function setActiveSection(navbarState, payload) {
  return navbarState.set('activeSection', payload.section);
}

function setSectionLoading(navbarState, payload) {
  return navbarState
    .setIn(['dropdownContent', payload.section, 'loading'], payload.loading);
}

function setDesignDropdown(navbarState, payload) {
  return navbarState.setIn(['dropdownContent', SECTION_ENUM.DESIGN], fromJS(payload.designMenu));
}

function setResourcesDropdown(navbarState, payload) {
  return navbarState.setIn(['dropdownContent', SECTION_ENUM.RESOURCE], fromJS(payload.resourcesMenu));
}
function setAccessDropdown(navbarState, payload) {
    return navbarState.setIn(['dropdownContent', SECTION_ENUM.ACCESSCONTROL], fromJS(payload.accessMenu));
}
function setProductsDropdown(navbarState, payload) {
  return navbarState.setIn(['dropdownContent', SECTION_ENUM.PRODUCTS], fromJS(payload.productsMenu));
}
function setProductCategoryDropdown(navbarState, payload) {
  return navbarState
    .setIn(['dropdownContent', SECTION_ENUM.PRODUCTS, 'loading'], false)
    .setIn(['dropdownContent', SECTION_ENUM.PRODUCTS, 'levels', '1', String(payload.categoryID)], fromJS(payload.categoryMenu));
}

function setActiveLevel(navbarState, payload) {
  const activeSection = navbarState.get('activeSection');
  return navbarState.setIn(['dropdownContent', activeSection, 'active'],
    fromJS({ level: payload.level, id: payload.id }));
}

function setActivePreview(navbarState, payload) {
  const activeSection = navbarState.get('activeSection');
  const { level, id } = navbarState.getIn(['dropdownContent', activeSection, 'active']).toJS();
  return navbarState.setIn(['dropdownContent', activeSection, 'levels', String(level), String(id), 'activePreview'], fromJS(payload.preview));
}

// navbarReducer uses composer reduction to break navbar state reducer to its own function
export default function navbarReducer(navbarState, action) {
  if (action.payload === null) {
    return navbarState;
  }
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return setActiveSection(navbarState, action.payload);
    case 'SET_SECTION_LOADING':
      return setSectionLoading(navbarState, action.payload);
    case 'SET_DESIGN_DROPDOWN':
      return setDesignDropdown(navbarState, action.payload);
    case 'SET_RESOURCES_DROPDOWN':
      return setResourcesDropdown(navbarState, action.payload);
    case 'SET_ACCESS_DROPDOWN':
      return setAccessDropdown(navbarState, action.payload);
    case 'SET_PRODUCTS_DROPDOWN':
      return setProductsDropdown(navbarState, action.payload);
    case 'SET_PRODUCT_CATEGORY_DROPDOWN':
      return setProductCategoryDropdown(navbarState, action.payload);
    case 'SET_ACTIVE_LEVEL':
      return setActiveLevel(navbarState, action.payload);
    case 'SET_ACTIVE_PREVIEW':
      return setActivePreview(navbarState, action.payload);
    default:
      return navbarState;
  }
}
