import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: regular;
    src: url('/fonts/lineto-brown-regular.ttf');
    font-display: swap;
  }

  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: bold;
    src: url("/fonts/lineto-brown-bold.ttf");
    font-display: swap;
  }

  body {
    font-family: ${(props) => props.theme.fonts.body};
    margin: 0;
    padding: 0;

    & > #root {
      min-height: 100vh;
    }
  }

  a {
    color: ${(props) => props.theme.colors.purple};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.yellow};

    }

    transition: 0.15s color ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.header};
  }

  input, textarea, select {
    font-family: inherit;
  }

  .toast-notification {
    z-index: 100000;
  }

  @media screen and (min-width: ${(props) => props.theme.screens.smUp}) {
    .bm-burger-button, .bm-menu-wrap {
        display: none;
    }
  }
`;

export default GlobalStyles;
