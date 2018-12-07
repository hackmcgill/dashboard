import {createGlobalStyle} from 'styled-components';
// import { ITheme } from 'src/theme';

// interface GlobalStylesProps {
//     theme?: ITheme
// }

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: regular;
    src: url("src/assets/fonts/lineto-brown-regular.ttf");
  }

  @font-face {
    font-family: 'Brown';
    font-style: normal;
    font-weight: bold;
    src: url("src/assets/fonts/lineto-brown-bold.ttf");
  }

  a {
    color: #FFFFFF;
  }

  body {
    font-family: 'Hind Siliguri', -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 0;
    
    & > #root {
      min-height: 100vh;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Brown', sans-serif;
  }

  .toast-notification {
    z-index: 100000;
  }
`
export default GlobalStyles
