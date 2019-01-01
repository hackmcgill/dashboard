// import { Formik } from 'formik';
import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import { StyledModal } from '../shared/Elements';

export enum ModalState {
  CREATE,
  JOIN,
}

interface ITeamModalProps {
  modalState: ModalState;
}

interface ITeamModalState {
  isOpen: boolean;
}

class TeamModal extends React.Component<ITeamModalProps, ITeamModalState> {
  constructor(props: ITeamModalProps) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  public render() {
    return (
      <ModalProvider>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}
        >
          <span>I am a modal!</span>
          <button onClick={this.toggleModal}>Close me</button>
        </StyledModal>
      </ModalProvider>
    );
  }
  private toggleModal(e: any) {
    this.setState({ isOpen: !this.state.isOpen });
  }
}

export { TeamModal };
