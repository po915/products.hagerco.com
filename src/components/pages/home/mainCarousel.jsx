/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from 'reactstrap';
import { StoreContext } from '../../../state/StoreContext';
import { OverlayLearnMore } from './learnMore';

export default function MainCarousel(props) {
  const { state, actions, ...rest } = useContext(StoreContext);

  // Fetch slides from Censhare
  useEffect(() => {
    actions.home.fetchSlides();
  }, []);

  // Use local state to track UI state
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Reactstrap Carousel Functions
  function onExiting() {
    setAnimating(true);
  }

  function onExited() {
    setAnimating(false);
  }

  function next() {
    if (animating) return;
    setActiveIndex(activeIndex === state.getIn(['home', 'slides']).length - 1 ? 0 : activeIndex + 1);
  }

  function previous() {
    if (animating) return;
    setActiveIndex(activeIndex === 0 ? state.getIn(['home', 'slides']).length - 1 : activeIndex - 1);
  }

  function goToIndex(newIndex) {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  return (
    <>
      { state.getIn(['home', 'slides']) == null ? ''
        : (
          <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={50000}>
            <CarouselIndicators
              items={state.getIn(['home', 'slides'])}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            { state.getIn(['home', 'slides']).map((slide, i) => (
              <CarouselItem onExiting={onExiting} onExited={onExited} key={slide.src}>
                <CarouselContent slide={slide} i={i} />
              </CarouselItem>
            ))}
          </Carousel>
        )
      }
    </>
  );
}

function CarouselContent({ slide, i }) {
  const overlayPositionMap = {
    0: ['mr-auto', '50%'],
    1: ['ml-auto', '65%'],
    2: ['mx-auto', '85%'],
  };
  const overlayPosition = overlayPositionMap[i % 3];

  return (
    <div data-stellar-background-ratio=".5" style={{ backgroundImage: `url(${slide.image})` }}>
      <div className="carousel-content">
        <OverlayLearnMore
          heading={slide.title}
          content={slide.content}
          href={slide.href}
          overlayPosition={overlayPosition}
        />
      </div>
    </div>
  );
}
