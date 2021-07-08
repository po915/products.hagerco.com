/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import FeaturedImage from './featuredImage';
import PreviewSection from './previewSection';
import ImageRow from './imageRow';
import { StoreContext } from '../../../state/StoreContext';
import * as routes from '../../routes';

export default function ProjectsHomeSection({ dark }) {
  const { state, actions, ...rest } = useContext(StoreContext);

  // Fetch featured projects from Censhare
  useEffect(() => {
    actions.home.fetchProjectImages();
  }, []);

  return (state.getIn(['home', 'projectImages']) == null
    ? <div>Loading...</div>
    : (
      <PreviewSection link={routes.INDEX} title="Projects Showcase" linkTitle="Browse Projects" dark={dark}>
        <FeaturedImage
          src="/public/images/room-7.jpg"
          title="Two Twelve Clayton"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          href={routes.INDEX}
        />
        <ImageRow images={state.getIn(['home', 'projectImages'])} />
      </PreviewSection>
    )
  );
}
