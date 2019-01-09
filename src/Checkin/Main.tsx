import React from 'react';

interface ICheckinState {
  loading: boolean;
}

class Checkin extends React.Component<{}, ICheckinState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  public render() {
    return <div />;
  }
}

export default Checkin;
