/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { ImageLearnMoreRow } from './learnMore';
import ImageRow from './imageRow';
import PreviewSection from './previewSection';
import { StoreContext } from '../../../state/StoreContext';
import * as routes from '../../routes';

export default function NewsHomeSection({ dark }) {
  const { state, actions, ...rest } = useContext(StoreContext);

  // Fetch news from Censhare
  useEffect(() => {
    actions.home.fetchNewsImages();
  }, []);

  return (state.getIn(['home', 'newsImages']) == null
    ? <div>Loading...</div>
    : (
      <PreviewSection link={routes.INDEX} title="Latest News" linkTitle="Check out the Blog" dark={dark}>
        <ImageLearnMoreRow images={state.getIn(['home', 'newsImages', 'featured'])} classes="mb-4" />
        <ImageRow images={state.getIn(['home', 'newsImages', 'images'])} />
      </PreviewSection>
    )
  );
}
