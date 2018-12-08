import { createGlobalStyle } from "styled-components";
import { ITheme } from "src/theme";

interface IGlobalStylesProps {
  theme?: ITheme;
}

const GlobalStyles = createGlobalStyle`
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
    font-family: ${(props: IGlobalStylesProps) => props.theme && props.theme.fonts.body};
    margin: 0;
    padding: 0;
    
    & > #root {
      min-height: 100vh;
    }
  }

  a {
    color: ${(props: IGlobalStylesProps) =>
      (props.theme && props.theme.colors.greyDark) || "grey"};

    &:hover {
      color: ${(props: IGlobalStylesProps) =>
        (props.theme && props.theme.colors.greyLight) || "grey"};

    }

    transition: 0.15s color ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props: IGlobalStylesProps) => props.theme && props.theme.fonts.header};
  }

  .toast-notification {
    z-index: 100000;
  }
`;
export default GlobalStyles;
