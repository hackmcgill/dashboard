import * as React from 'react';

import { Box, Flex } from '@rebass/grid';
import Clipboard from 'clipboard';

import CopyImage from '../../assets/images/copy-icon.svg';
import Image from './Image';

interface IClipboardProps {
  value: string;
  onSuccess?: (e: any) => void;
  onError?: (e: any) => void;
}

class ClipboardComponent extends React.Component<IClipboardProps, {}> {
  private clipboard: Clipboard;
  private copy: Element | null;
  private text: Element | null;
  constructor(props: IClipboardProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { value } = this.props;
    return (
      <Flex mt={0}>
        <Box
          ref={(element) => {
            this.text = element;
          }}
        >
          {value}
        </Box>
        <Box ml={'18px'} mt={'2px'}>
          <div className="copy-link">
            <Image
              imgHeight={'20px'}
              src={CopyImage}
              ref={(element) => {
                this.copy = element;
              }}
            />
          </div>
        </Box>

        <style jsx>{`
          .copy-link {
            cursor: pointer;
            filter: invert(42%) sepia(65%) saturate(398%) hue-rotate(196deg) brightness(83%) contrast(93%);
            transition: filter 0.25s ease-in;
          }

          .copy-link:hover {
            filter: invert(28%) sepia(100%) saturate(3848%) hue-rotate(209deg) brightness(102%) contrast(108%);
          }
        `}</style>
      </Flex>
    );
  }

  public componentDidMount() {
    const button = this.copy;
    const input = this.text;
    if (button && input) {
      this.clipboard = new Clipboard(button, {
        target: () => input,
      });
      const success = this.props.onSuccess
        ? this.props.onSuccess
        : (e: any) => null;
      const error = this.props.onError ? this.props.onError : (e: any) => null;

      this.clipboard.on('success', success);
      this.clipboard.on('error', error);
    }
  }

  public componentWillUnmount() {
    this.clipboard.destroy();
  }
}

export default ClipboardComponent;
