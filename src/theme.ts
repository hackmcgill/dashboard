const theme = {
  colors: {
    greyLighter: "#F4F4F4",
    greyLight: "#BCBCBC",
    grey: "#797979",
    greyDark: "#4D4D4D",
    primaryLight: "#F89790",
    primary: "#F2463A",
    white: "#FFFFFF",
  },
  inputBorderRadius: "20px",
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
  }
  inputBorderRadius: string;
}

export default theme;
