const theme = {
  colors: {
    red: '#F2463A',
    redMed: '#F56F65',
    redLight: '#F89790',

    yellow: '#FFD081',
    yellowLight: 'FFEFB6',

    teal: '#48DEE2',
    tealLight: '#88FCFF',

    white: '#FFFFFF',
    black: '#202020',
    black80: '#4D4D4D',
    black70: '#636363',
    black60: '#797979',
    black40: '#A6A6A6',
    black30: '#BCBCBC',
    black20: '#D2D2D2',
    black10: '#E9E9E9',
    black5: '#F4F4F4',
  },
  inputBorderRadius: '20px',
  fonts: {
    header: 'Brown, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    body:
      'Hind Siliguri, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  screens: {
    smUp: '768px',
    mdUp: '992px',
    lgUp: '1200px',
  },
};

export interface ITheme {
  colors: {
    red: string;
    redMed: string;
    redLight: string;
    yellow: string;
    yellowLight: string;
    teal: string;
    tealLight: string;
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

export default theme;
