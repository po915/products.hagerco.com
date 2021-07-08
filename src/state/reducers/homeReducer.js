/*
  homeReducer handles state corresponding to the home page.

  Structure:
  ---
  state
    home
      sections
      slides
      productImages
      projectImages
      newsImages
*/

export const actionStateMap = {
  SET_HOME_SECTIONS: 'sections',
  SET_HOME_SLIDES: 'slides',
  SET_HOME_PRODUCT_IMAGES: 'productImages',
  SET_HOME_PROJECT_IMAGES: 'projectImages',
  SET_HOME_NEWS_IMAGES: 'newsImages',
};

// updateHomeState sets a specific portion of the home state slice with fetched data
function updateHomeState(homeState, action) {
  return homeState.set(actionStateMap[action.type], action.payload);
}

// homeReducer uses composer reduction to break home state reducer to its own function
export default function homeReducer(homeState, action) {
  switch (action.type) {
    case 'SET_HOME_SECTIONS':
    case 'SET_HOME_SLIDES':
    case 'SET_HOME_PRODUCT_IMAGES':
    case 'SET_HOME_PROJECT_IMAGES':
    case 'SET_HOME_NEWS_IMAGES':
      return updateHomeState(homeState, action);
    default:
      return homeState;
  }
}
