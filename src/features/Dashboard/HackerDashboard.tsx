import * as React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import WithToasterContainer from '../../shared/HOC/withToaster';

class HackerDashboardContainer extends React.Component {
  public render() {
    return (
      <Sidebar currentPage= "Home"/>
    );
  }
}

export default WithToasterContainer(HackerDashboardContainer);
