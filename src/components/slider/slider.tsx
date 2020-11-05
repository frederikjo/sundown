import React, {
  memo,
  FC,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { usePrevious } from "../../utils/hooks";

import { StyledSliderDiv, StyledSlideDiv } from "./styles";

interface ISliderProps {
  className?: string;
  // The slider needs to know which slide should be visible.
  activeSlide: number;
  // Function for incrementing activeSlide
  moveRight: () => void;
  // Function for decrementing activeSlide
  moveLeft: () => void;
}

export const Slider: FC<ISliderProps> = memo(
  ({ className, children, activeSlide, moveLeft, moveRight }) => {
    const childAmount = React.Children.count(children);
    const sliderRef = useRef<HTMLDivElement>(null);
    const startX = useRef<number>(0);
    const moveX = useRef<number>(0);
    const isFlick = useRef<boolean>(true);
    const isFlickId = useRef<number>();
    const [transitioning, setTransitioning] = useState<boolean>(false);
    const prevSlide = usePrevious<number>(activeSlide);

    const resetTransition = useCallback(() => {
      setTransitioning(false);
    }, []);

    const touchStartHandler = useCallback(
      (event: React.TouchEvent) => {
        resetTransition();
        startX.current = event.touches[0].clientX;
        isFlickId.current = setTimeout(() => (isFlick.current = false), 250);
      },
      [resetTransition]
    );

    const touchMoveHandler = useCallback((event: React.TouchEvent) => {
      moveX.current = event.touches[0].clientX - startX.current;
      sliderRef.current.style.transform = `translateX(${moveX.current}px)`;
    }, []);

    const touchEndHandler = useCallback(() => {
      if (typeof sliderRef.current !== "object") {
        return;
      }

      const sliderStyles = window.getComputedStyle(sliderRef.current);
      // Get the width of the slider div, removing the 'px' from the end of the string
      const sliderWidth = Number(
        sliderStyles.getPropertyValue("width").slice(0, -2)
      );
      // We only need to care about transitioning when using touch controls.
      // The screen should smoothly snap back after being dragged
      // but not while being dragged.
      setTransitioning(true);
      sliderRef.current.style.transform = "";
      if (
        // If you touched the screen for less than the timeout and moved more than 30px
        // or you moved the screen more than one third of its width
        (isFlick && Math.abs(moveX.current) > 30) ||
        Math.abs(moveX.current) > sliderWidth / 3
      ) {
        // If the screen is dragged to the left
        if (moveX.current < 0) {
          moveRight();
        }
        // If the screen is dragged to the right
        if (moveX.current > 0) {
          moveLeft();
        }
      }
      moveX.current = 0;
      clearTimeout(isFlickId.current);
      isFlick.current = true;
    }, [moveRight, moveLeft]);

    useEffect(() => {
      document.addEventListener("touchend", touchEndHandler);
      return () => document.removeEventListener("touchend", touchEndHandler);
    }, [touchEndHandler]);

    if (React.Children.count(children) === 1) {
      return <div className={className}>{children}</div>;
    }

    return (
      <StyledSliderDiv
        className={className}
        ref={sliderRef}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTransitionEnd={resetTransition}
        transition={transitioning ? `transform 0.4s` : ""}
        amount={childAmount}
      >
        {React.Children.map(children, (child, index) => {
          // Some slides should be invisible while moving across the screen
          // Every slide is visible to begin with
          const invis = new Array(childAmount).fill(false);
          // How many slides are jumped at once: less than 0 equals one slide.
          const slideJump =
            (Math.abs(prevSlide - activeSlide) % childAmount) - 1;
          // If moving one slide at a time, or moving from the last slide to the first
          if (
            isNaN(slideJump) ||
            slideJump < 1 ||
            slideJump === childAmount - 2
          ) {
            // Hide the first slide when moving to or away from the last slide
            invis[0] =
              (prevSlide === childAmount - 1 &&
                activeSlide === prevSlide - 1) ||
              (activeSlide === childAmount - 1 &&
                prevSlide === activeSlide - 1);
            // Hide the last slide when moving to or away from the first slide
            invis[childAmount - 1] =
              (prevSlide === 1 && activeSlide === 0) ||
              (prevSlide === 0 && activeSlide === 1);
            for (let i = 1; i < childAmount - 1; i++) {
              // Hide every slide between the first and the last when jumping between the first and last slide
              invis[i] =
                (prevSlide === childAmount - 1 && activeSlide === 0) ||
                (prevSlide === 0 && activeSlide === childAmount - 1);
            }
          } else {
            for (let i = 0; i < childAmount; i++) {
              // If you jump several slides at once, only let the active one be visible
              invis[i] = i !== activeSlide;
            }
          }
          return (
            <StyledSlideDiv
              index={index}
              activeSlide={activeSlide}
              amount={childAmount}
              invisible={invis}
            >
              {child}
            </StyledSlideDiv>
          );
        })}
      </StyledSliderDiv>
    );
  }
);
