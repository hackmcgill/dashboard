import { Box, Flex } from '@rebass/grid';
import React from 'react';
import { Button, ButtonVariant, StyledModalSmall } from '.';

interface IConfirmModalProps {
  isOpen: boolean;
  onConfirmed: () => void;
  onCanceled: () => void;
  children?: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = (
  props: IConfirmModalProps
) => {
  return (
    <StyledModalSmall
      appElement={document.getElementById('root') || undefined}
      isOpen={props.isOpen}
      onRequestClose={props.onCanceled}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <Flex flexDirection={'column'}>
        {props.children}
        <Flex flexDirection={'row'} justifyContent={'space-evenly'}>
          <Box>
            <Button
              type="button"
              onClick={props.onCanceled}
              variant={ButtonVariant.Secondary}
            >
              {props.cancelLabel}
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              onClick={props.onConfirmed}
              variant={ButtonVariant.Primary}
            >
              {props.confirmLabel}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </StyledModalSmall>
  );
};

ConfirmModal.defaultProps = {
  cancelLabel: "No",
  confirmLabel: "Yes",
}

export default ConfirmModal;
