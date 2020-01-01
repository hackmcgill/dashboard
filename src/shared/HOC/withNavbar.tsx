import * as React from 'react';
import Navbar from '../../features/Nav/Navbar';


export interface INavbarOptions {
  // The active page
  activePage: string;
}

const defaultOptions = {
  activePage: 'home'
};

const withNavbar = <P extends {}>(
  Component: React.ComponentType<P>,
  options: INavbarOptions = defaultOptions
) =>
  class extends React.Component<P> {
    public render() {
      return [
        <Navbar key={0} activePage={options.activePage} />,
        <Component key={1} {...this.props} />,
      ];
    }
  };

export default withNavbar;
