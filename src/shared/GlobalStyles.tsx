import { createGlobalStyle } from "styled-components";
import { ITheme } from "src/theme";

interface IGlobalStylesProps {
  theme?: ITheme;
}

const GlobalStyles = createGlobalStyle`
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
    font-family: 'Hind Siliguri', serif;
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
    font-family: Brown, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
  }

  .toast-notification {
    z-index: 100000;
  }
`;
export default GlobalStyles;
