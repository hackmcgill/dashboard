import { Box, Flex } from '@rebass/grid';
import React from 'react';
import { Button, ButtonVariant, StyledModalSmall } from '.';

interface IConfirmModalProps {
  isOpen: boolean;
  onConfirmed: () => void;
  onCanceled: () => void;
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
        <Box alignSelf={'center'}>
          Are you sure you want to make these changes?
        </Box>
        <Box mb={'10px'} alignSelf={'center'}>
          This will change the hackathon settings.
        </Box>
        <Flex flexDirection={'row'} justifyContent={'space-evenly'}>
          <Box>
            <Button
              type="button"
              onClick={props.onCanceled}
              variant={ButtonVariant.Primary}
            >
              No
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              onClick={props.onConfirmed}
              variant={ButtonVariant.Primary}
            >
              Yes
            </Button>
          </Box>
        </Flex>
      </Flex>
    </StyledModalSmall>
  );
};

export default ConfirmModal;
