export default function homeActions(state, dispatch, backend) {
  const fetchSlides = async () => {
    const slides = await backend.home.getCarousel();
    dispatch({ type: 'SET_HOME_SLIDES', payload: slides });
  };

  const fetchProductImages = async () => {
    const images = await backend.home.getProductImages();
    dispatch({ type: 'SET_HOME_PRODUCT_IMAGES', payload: images });
  };

  const fetchProjectImages = async () => {
    const images = await backend.home.getProjectImages();
    dispatch({ type: 'SET_HOME_PROJECT_IMAGES', payload: images });
  };

  const fetchNewsImages = async () => {
    const images = await backend.home.getNewsImages();
    dispatch({ type: 'SET_HOME_NEWS_IMAGES', payload: images });
  };

  return {
    fetchSlides,
    fetchProductImages,
    fetchProjectImages,
    fetchNewsImages,
  };
}
