import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      red: string;
      redMed: string;
      redLight: string;
      blue: string;
      blueLight: string;
      yellow: string;
      yellowLight: string;
      teal: string;
      tealLight: string;
      purple: string;
      purpleLight: string;
      greyLight: string;
      white: string;
      black: string;
      black80: string;
      black70: string;
      black60: string;
      black40: string;
      black30: string;
      black20: string;
      black10: string;
      black5: string;
    };
    fonts: {
      header: string;
      body: string;
    };
    inputBorderRadius: string;
    screens: {
      smUp: string;
      mdUp: string;
      lgUp: string;
    };
  }
}
