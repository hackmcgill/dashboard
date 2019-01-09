import { createGlobalStyle } from './styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Hind+Siliguri:400,700');

  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: regular;
    src: url('/fonts/lineto-brown-bold.ttf');
  }

  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: bold;
    src: url("/fonts/lineto-brown-bold.ttf");
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
    color: ${(props) => props.theme.colors.greyDark};

    &:hover {
      color: ${(props) => props.theme.colors.greyLight};

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
`;

export default GlobalStyles;
