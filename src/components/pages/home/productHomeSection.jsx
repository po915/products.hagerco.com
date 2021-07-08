/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import PreviewSection from './previewSection';
import FeaturedImage from './featuredImage';
import { StoreContext } from '../../../state/StoreContext';
import { ImageLearnMoreRow } from './learnMore';
import * as routes from '../../routes';

export default function ProductHomeSection({ dark }) {
  const { state, actions, ...rest } = useContext(StoreContext);

  // Fetch featured products from Censhare
  useEffect(() => {
    actions.home.fetchProductImages();
  }, []);

  return (state.getIn(['home', 'productImages']) == null
    ? <div>Loading...</div>
    : (
      <PreviewSection link={routes.INDEX} title="Products" linkTitle="Browse All Products" dark={dark}>
        <FeaturedImage
          src="/public/images/card-lock.jpg"
          title="Access Control"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          href={routes.ACCESS_CONTROL}
        />
        <ImageLearnMoreRow images={state.getIn(['home', 'productImages'])} />
      </PreviewSection>
    )
  );
}
