import * as React from 'react';

import { Checkbox } from '../shared/Form/';

import { Sponsor } from '../api';
import { ISponsor } from '../config';

interface IProps {
  hackerId: string;
}

interface IState {
  isChecked: boolean;
  isChanging: boolean;
  sponsor?: ISponsor;
}

class HackerSelect extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isChecked: false,
      isChanging: false,
      sponsor: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  public render() {
    return (
      <div>
        <Checkbox checked={this.state.isChecked} onChange={this.handleChange} />
      </div>
    );
  }

  public async componentDidMount() {
    const { hackerId } = this.props;

    const response = await Sponsor.getSelf();
    const sponsor = response.data.data;
    const isChecked = sponsor.nominees.indexOf(hackerId) > -1;
    this.setState({ sponsor, isChecked });
  }

  private async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const { sponsor, isChanging } = this.state;
    const { hackerId } = this.props;

    if (!sponsor || isChanging) {
      return;
    }

    if (isChecked) {
      sponsor.nominees.push(hackerId);
    } else {
      sponsor.nominees = sponsor.nominees.filter((n) => n !== hackerId);
    }

    this.setState({ isChanging: true });
    await Sponsor.update(sponsor);
    this.setState({ isChanging: false });
    this.setState({ isChecked });
  }
}

export default HackerSelect;
