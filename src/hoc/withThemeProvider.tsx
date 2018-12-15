import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../shared/GlobalStyles';
import theme from '../theme';

const withThemeProvider = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }

    public render() {
      return (
        <ThemeProvider theme={theme}>
          <div>
            <GlobalStyles />
            <Component {...this.props} />
          </div>
        </ThemeProvider>
      );
    }
  };

export default withThemeProvider;
