import * as React from "react";
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';

const withThemeProvider = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }

    public render() {
      return (
        <ThemeProvider theme={theme}>
          <Component/>
        </ThemeProvider>
      )
    }
  }

export default withThemeProvider;
