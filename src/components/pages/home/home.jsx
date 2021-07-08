/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import MainCarousel from './mainCarousel';
import ProductHomeSection from './productHomeSection';
import ProjectsHomeSection from './projectsHomeSection';
import NewsHomeSection from './newsHomeSection';
import HomeAbout from './homeAbout';
import { StoreContext } from '../../../state/StoreContext';

export default function Home() {
  return (
    <>
      <MainCarousel />
      <HomeAbout />
      <ProductHomeSection dark />
      <ProjectsHomeSection />
      <NewsHomeSection dark />
    </>
  );
}
