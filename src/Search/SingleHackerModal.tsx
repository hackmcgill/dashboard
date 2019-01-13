import * as React from 'react';
import Modal from 'react-modal';

import { IHacker } from '../config';
import { Button } from '../shared/Elements';
import SingleHackerView from './SingleHackerView';

interface IModalProps {
  hacker: IHacker;
}
interface IModalState {
  showModal: boolean;
}

class SingleHackerModal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  public render() {
    return (
      <div>
        <Button type="button" onClick={this.handleOpenModal}>
          Hello
        </Button>
        <Modal
          style={{ overlay: { zIndex: 3 } }}
          isOpen={this.state.showModal}
          contentLabel="Example Modal"
        >
          <Button type="button" onClick={this.handleCloseModal}>
            close
          </Button>
          <SingleHackerView hacker={this.props.hacker} />
        </Modal>
      </div>
    );
  }

  private handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  private handleCloseModal = () => {
    this.setState({ showModal: false });
  };
}

export default SingleHackerModal;
