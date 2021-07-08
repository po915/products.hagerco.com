import { fromJS } from 'immutable';

/*
  contentReducer handles state corresponding to the page content

  Structure:
  ---
  state
    content
      details
      loading
*/

// setContentLoading sets the loading state and resets the status state
function setContentLoading(contentState, payload) {
  if (payload.loading === true) {
    return contentState.set('loading', true).set('status', null);
  } else if (payload.loading === false) {
    return contentState.set('loading', false);
  }
  return contentState;
}

// setContent populates the content state with the payload
function setContent(contentState, payload) {
  if (payload.status === false) {
    return contentState.set('status', false);
  } else if (payload.status === null) {
    return contentState.clear().set('status', null);
  }
  return contentState.set('status', true).set('details', fromJS(payload.content));
}

// contentReducer uses composer reduction to break home state reducer to its own function
export default function contentReducer(contentState, action) {
  switch (action.type) {
    case 'SET_CONTENT_LOADING':
      return setContentLoading(contentState, action.payload);
    case 'SET_CONTENT_DETAILS':
      return setContent(contentState, action.payload);
    default:
      return contentState;
  }
}
