/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { StoreContext } from '../../../state/StoreContext';
import Loading from '../loading/loading';
import errorRedirect from '../error/errorRedirect';
import contentRenderer from '../../helpers/contentRenderer';

export default function Content({ location }) {
  const { state, actions, dispatch, ...rest } = useContext(StoreContext);

  // Get path from route
  /*if (location.pathname == null) {
    return errorRedirect(location);
  }*/

  // Fetch article details from Censhare
  useEffect(() => {
    dispatch({ type: 'SET_CONTENT_LOADING', payload: { loading: true } });
    actions.content.fetchArticle(location.pathname).then(() => {
      dispatch({ type: 'SET_CONTENT_LOADING', payload: { loading: false } });
    });

    // Clear out after exiting page
    return () => {
      dispatch({ type: 'SET_CONTENT_DETAILS', payload: { status: null, content: null } });
    };
  }, [location.pathname]);

  const contentState = state.get('content').toJS();

  if (contentState.status === null && !contentState.loading) {
    // Don't render anything if status is null and not loading (initial render/component unmount)
    return <></>;
  } else if (contentState.status === false) {
    // Redirect if not found
    return errorRedirect(location);
  } else if (contentState.loading) {
    // Render loading modal if loading
    document.title = 'Loading...';
    return <Loading />;
  }

  // Details fetched successfully, get content detail
  const content = contentState.details;

  // Set document title from article
  document.title = content.title;
  
  
  return (
    <>
        <section className="hc-section pt-5">
        <div className="container-fluid">
            <h1 className="red-bar-above">{content.title}</h1>
            {
            content.sidebar !== undefined
                ? (
                <div className="row">
                    <div className="col-9">
                    <Main content={content.main} />
                    </div>
                    <div className="col-3">
                    <Sidebar content={content.sidebar} />
                    </div>
                </div>
                ) : (
                <Main content={content.main} />
                )
            }
        </div>
        </section>
    </>
  );
}

function Main({ content }) {
    const xlinkRegex = /xlink:href="([\S]+)"/;
  if (content.keyVisual !== undefined){
    var regexArray = content.keyVisual.match(xlinkRegex);
    var imageArray = regexArray[0].split("=");
    var keyVisualURL = imageArray[1];
  }
  return (
    <>
        <section className="hc-section mb-3" data-stellar-background-ratio = ".5" style={{ backgroundImage: `url(${keyVisualURL})`}} min-height="3000px">
        </section>
            { contentRenderer.render(content.richText) }
    </>
  );
}

function Sidebar({ content }) {
  return (
    <>
      {
        content.map((sidebar, i) => (
          <>
            { contentRenderer.render(sidebar.richText) }
          </>
        ))
      }
    </>
  );
}
