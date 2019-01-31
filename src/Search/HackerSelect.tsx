import * as React from 'react';
import { Sponsor } from '../api';
import { Checkbox } from '../shared/Form/';
import NomineeContext from './Context';

interface IProps {
  hackerId: string;
}

interface IState {
  isChecked: boolean;
  isChanging: boolean;
}

class HackerSelect extends React.Component<IProps, IState> {
  public static contextType = NomineeContext;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isChecked: false,
      isChanging: false,
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

    const isChecked = this.context.nominees.indexOf(hackerId) > -1;
    this.setState({ isChecked });
  }

  private async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const { isChanging } = this.state;
    const { hackerId } = this.props;

    if (isChanging) {
      return;
    }

    if (isChecked) {
      this.context.nominees.push(hackerId);
    } else {
      this.context.nominees = this.context.nominees.filter(
        (n: string) => n !== hackerId
      );
    }

    this.setState({ isChanging: true });
    await Sponsor.update(this.context);
    this.setState({ isChanging: false });
    this.setState({ isChecked });
  }
}

export default HackerSelect;
