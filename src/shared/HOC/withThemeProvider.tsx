import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import theme from '../Styles/theme';

const withThemeProvider = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
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
