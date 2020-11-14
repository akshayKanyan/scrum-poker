import styled, { css } from "styled-components";

export const Wrapper = styled.div.attrs(({ className }) => ({
  className,
}))`
  ${(props) => {
    let {
      grid,
      col,
      center,
      container,
      theme,
      subContainer,
      noGrow,
      style,
      noFlex,
      align,
      justify,
      pt,
      padding,
      margin,
      cardHoverStyle,
    } = props || {};
    let computedStyle = {};
    if (grid) {
      computedStyle = {
        ...computedStyle,
        display: "grid",
      };
    } else {
      computedStyle = {
        ...computedStyle,
        display: "flex",
        flex: noFlex ? void 0 : 1,
        flexDirection: col ? "column" : "row",
      };
    }
    if (center) {
      computedStyle = {
        ...computedStyle,
        justifyContent: "center",
        alignItems: "center",
      };
    }
    if (pt) {
      computedStyle = {
        ...computedStyle,
        paddingTop: pt,
      };
    }
    if (padding) {
      computedStyle = {
        ...computedStyle,
        padding,
      };
    }
    if (margin) {
      computedStyle = {
        ...computedStyle,
        margin,
      };
    }
    if (align) {
      computedStyle = {
        ...computedStyle,
        alignItems: align,
      };
    }
    if (justify) {
      computedStyle = {
        ...computedStyle,
        justifyContent: justify,
      };
    }
    if (container) {
      computedStyle = {
        ...computedStyle,
        maxWidth: theme.containerWidth.mainContainerWidth + "px",
        width: "100%",
      };
    }
    if (subContainer) {
      computedStyle = {
        ...computedStyle,
        maxWidth: theme.containerWidth.subContainerWidth + "px",
        width: "100%",
      };
    }
    if (noGrow) {
      computedStyle = {
        ...computedStyle,
        flex: "none",
      };
    }
    if (style) {
      if (typeof style !== "object") {
        computedStyle = {
          ...computedStyle,
        };
      } else {
        computedStyle = {
          ...computedStyle,
          ...style,
        };
      }
    }
    return css(computedStyle);
  }}
  ${(props) => {
    if (props.cardHoverStyle) {
      return `
      &:hover {
      color: red; 
  `;
    }
  }}
`;
