import styled, { css } from "styled-components";

export const H1 = styled.h1.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.h1 + "px";
  }};
  ${(props = {}) => {
    let computedStyle = {};
    let { pt, cursor } = props;
    if (pt) {
      computedStyle = { ...computedStyle, paddingTop: pt };
    }
    if (cursor) {
      computedStyle = {
        ...computedStyle,
        cursor,
      };
    }
    return css(computedStyle);
  }}
`;

export const H2 = styled.h2.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.h2 + "px";
  }};
`;

export const H3 = styled.h3.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.h3 + "px";
  }};
  @keyframes random {
    15% {
      color: ${() => "#" + Math.floor(Math.random() * 16777215).toString(16)};
    }
    30% {
      color: ${() => "#" + Math.floor(Math.random() * 16777215).toString(16)};
    }
    45% {
      color: ${() => "#" + Math.floor(Math.random() * 16777215).toString(16)};
    }
    60% {
      color: ${() => "#" + Math.floor(Math.random() * 16777215).toString(16)};
    }
    75% {
      color: ${() => "#" + Math.floor(Math.random() * 16777215).toString(16)};
    }
  }
  ${(props) => {
    let { animation, cursor } = props;
    let computedStyle = {};
    if (animation) {
      computedStyle = {
        ...computedStyle,
        "-webkit-animation": "random 1s infinite",
        animation: "random 1s infinite",
      };
    }
    if (cursor) {
      computedStyle = {
        ...computedStyle,
        cursor,
      };
    }
    return css(computedStyle);
  }}
`;

export const P1 = styled.p.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.p1 + "px";
  }};
`;

export const P2 = styled.p.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.p2 + "px";
  }};
`;

export const P3 = styled.p.attrs(({ className }) => ({
  className,
}))`
  font-size: ${(props) => {
    return props.theme.fonts.p3 + "px";
  }};
`;

export const Sh = styled.p.attrs(({ className }) => ({
  className,
}))`
  font-weight: bold;
  color: ${(props) => {
    return props.theme.constCustomColors.USGreen;
  }};
  font-size: ${(props) => {
    return props.theme.fonts.sh + "px";
  }};
`;

export const CustomInput = styled.input.attrs(({ className }) => ({
  className,
}))`
  width: 200px;
`;
