import * as React from 'react';

import { Box, Flex } from '@rebass/grid';
import Modal from 'react-modal';

import { IHacker } from '../config';
import { Button, Image } from '../shared/Elements';
import SingleHackerView from './SingleHackerView';

import Arrow from '../assets/images/backarrow.svg';

interface IModalProps {
  hacker: IHacker;
  allHackers: IHacker[];
}
interface IModalState {
  showModal: boolean;
  currentHackerIndex: number;
}

class SingleHackerModal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      showModal: false,
      currentHackerIndex: -1,
    };
  }

  public componentDidMount() {
    this.resetIndex();
  }

  public componentDidUpdate(prevProps: IModalProps) {
    if (prevProps.hacker.id !== this.props.hacker.id) {
      this.resetIndex();
    }
  }

  public render() {
    return (
      <div>
        <Button type="button" onClick={this.handleOpenModal}>
          See more
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
          <Flex
            width="100%"
            justifyContent="flex-end"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <Button type="button" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Flex>
          <Flex width="100%" alignItems="center" style={{ height: '100%' }}>
            <Flex width={1 / 8}>
              <Button
                isNarrow={true}
                type="button"
                onClick={this.handlePrevious}
                disabled={this.state.currentHackerIndex <= 0}
              >
                <Image src={Arrow} imgHeight="20px" alt="Previous" />
              </Button>
            </Flex>
            <Box
              width={6 / 8}
              style={{
                overflowY: 'scroll',
                height: '90%',
              }}
            >
              <SingleHackerView
                hacker={this.props.allHackers[this.state.currentHackerIndex]}
              />
            </Box>
            <Flex width={1 / 8} justifyContent="flex-end">
              <Button
                isNarrow={true}
                onClick={this.handleNext}
                disabled={
                  this.state.currentHackerIndex >=
                  this.props.allHackers.length - 1
                }
              >
                <Image
                  style={{ transform: 'rotate(180deg)' }}
                  src={Arrow}
                  imgHeight="20px"
                  alt="Previous"
                />
              </Button>
            </Flex>
          </Flex>
        </Modal>
      </div>
    );
  }

  private handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  private handleCloseModal = () => {
    this.setState({ showModal: false });
    this.resetIndex();
  };

  private handleNext = () => {
    const index = this.state.currentHackerIndex;
    if (index < this.props.allHackers.length - 1) {
      this.setState({ currentHackerIndex: index + 1 });
    }
  };
  private handlePrevious = () => {
    const index = this.state.currentHackerIndex;
    if (index > 0) {
      this.setState({ currentHackerIndex: index - 1 });
    }
  };

  private resetIndex = () => {
    const currentHackerIndex = this.props.allHackers.findIndex(
      (hacker) => hacker.id === this.props.hacker.id
    );

    this.setState({ currentHackerIndex });
  };
}

export default SingleHackerModal;
