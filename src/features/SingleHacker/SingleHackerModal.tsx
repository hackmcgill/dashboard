import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { FrontendRoute, IHacker, UserType } from '../../config';
import { Button, Image, StyledModal } from '../../shared/Elements';
import SingleHackerView from './SingleHackerView';

import Arrow from '../assets/images/backarrow.svg';

interface IModalProps {
  hacker: IHacker;
  allHackers: IHacker[];
  userType: UserType;
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
    const hacker = this.props.allHackers[this.state.currentHackerIndex]
      ? this.props.allHackers[this.state.currentHackerIndex]
      : this.props.hacker;
    const hackerPage = FrontendRoute.VIEW_HACKER_PAGE.replace(':id', hacker.id);
    return (
      // tslint:disable-next-line
      <div onKeyDown={(e) => this.handleKeyPress(e)}>
        <Button type="button" onClick={this.handleOpenModal}>
          See more
        </Button>
        <StyledModal
          appElement={document.getElementById('root') || undefined}
          isOpen={this.state.showModal}
          contentLabel="Single Hacker View"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >
          <Flex
            width="100%"
            justifyContent="flex-end"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <Box>
              <Link
                to={hackerPage}
                target={'_blank'}
                style={{ color: 'white' }}
              >
                <Button>Open in new window</Button>
              </Link>
            </Box>
            <Box>
              <Button type="button" onClick={this.handleCloseModal}>
                Close
              </Button>
            </Box>
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
            <Flex
              justifyContent="center"
              width={6 / 8}
              style={{
                overflowY: 'scroll',
                height: '90%',
              }}
            >
              <SingleHackerView
                hacker={this.props.allHackers[this.state.currentHackerIndex]}
                userType={this.props.userType}
              />
            </Flex>
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
        </StyledModal>
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

  private handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        this.handlePrevious();
        break;
      case 'ArrowRight':
        this.handleNext();
        break;
    }
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
