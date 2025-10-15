// Slide animation constants
export const SLIDE_TRANSFORM_OFFSET = 59;
export const SLIDE_CENTER_OFFSET = 50;
export const SLIDE_ADJUSTMENT = 32;

// Calculate slide transform
export const calculateSlideTransform = (activeSlide) => 
  `translateX(calc(-${(activeSlide + 1) * SLIDE_TRANSFORM_OFFSET}% + ${SLIDE_CENTER_OFFSET}% - ${SLIDE_ADJUSTMENT}%))`;