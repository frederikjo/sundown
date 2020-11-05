import styled from "styled-components";

interface ISlideProps {
  index: number;
  amount: number;
  activeSlide: number;
  invisible?: boolean[];
}

export const StyledSliderDiv = styled.div<{
  amount: number;
  transition: string;
}>`
  position: relative;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  height: 80px;
  width: ${({ amount }) => `${amount * 100}%`};
  ${({ transition }) => (transition ? `transition: ${transition};` : "")}
`;

export const StyledSlideDiv = styled.div<ISlideProps>`
  transition: transform 0.4s;
  width: 100%;
  height: 100%;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow: hidden;
  ${({ index, amount, activeSlide }) => {
    // Move the first slide to the end if the last slide is active
    if (index === 0 && activeSlide === amount - 1) {
      return `transform: translateX(${index * -100 + 100}%);`;
    }
    // Move the last slide to the front if the first slide is active
    if (index === amount - 1 && activeSlide === 0) {
      return `transform: translateX(${index * -100 - 100}%);`;
    }
    // Move the active slide into view
    return `transform: translateX(${activeSlide * -100}%);`;
  }}
  ${({ index, invisible }) => (invisible[index] ? `visibility: hidden;` : "")}
`;
