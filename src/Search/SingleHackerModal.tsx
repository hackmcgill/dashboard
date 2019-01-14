import * as React from 'react';

import { Flex } from '@rebass/grid';
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
          appElement={document.getElementById('root') || undefined}
          style={{ overlay: { zIndex: 3 } }}
          isOpen={this.state.showModal}
          contentLabel="Example Modal"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >
          <Flex width="100%" justifyContent="flex-end">
            <Button type="button" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Flex>
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
