const theme = {
  colors: {
    greyLighter: '#F4F4F4',
    greyLight: '#BCBCBC',
    grey: '#797979',
    greyDark: '#4D4D4D',
    primaryLight: '#F89790',
    primary: '#F2463A',
    white: '#FFFFFF',
  },
  inputBorderRadius: '20px',
  fonts: {
    header: 'Brown, -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    body:
      'Hind Siliguri, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;',
  },
};

export interface ITheme {
  colors: {
    greyLighter: string;
    greyLight: string;
    grey: string;
    greyDark: string;
    primaryLight: string;
    primary: string;
    white: string;
  };
  fonts: {
    header: string;
    body: string;
  };
  inputBorderRadius: string;
}

export default theme;
