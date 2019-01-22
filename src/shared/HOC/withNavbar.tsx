import * as React from 'react';
import Footer from '../../Nav/Footer';
import Navbar from '../../Nav/Navbar';

const withNavbar = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }

    public render() {
      return [
        <Navbar key={0} />,
        <Component key={1} {...this.props} />,
        <Footer key={2} />,
      ];
    }
  };

export default withNavbar;
