import * as React from 'react';

import { Box, Flex } from '@rebass/grid';
import Clipboard from 'clipboard';

import CopyImage from '../../assets/images/copy-icon.svg';
import Image from './Image';

interface IClipboardProps {
  value: string;
}

interface IClipboardState {
  result: string;
}

class ClipboardComponent extends React.Component<
  IClipboardProps,
  IClipboardState
> {
  private clipboard: Clipboard;
  private copy: Element | null;
  private text: Element | null;
  constructor(props: IClipboardProps) {
    super(props);
    this.state = {
      result: '',
    };
  }

  public render() {
    const { value } = this.props;
    return (
      <Flex>
        <Box
          ref={(element) => {
            this.text = element;
          }}
        >
          {value}
        </Box>
        <Box ml={'10px'}>
          <Image
            imgHeight={'15px'}
            src={CopyImage}
            ref={(element) => {
              this.copy = element;
            }}
          />
        </Box>
        <Box ml={this.state.result ? '10px' : ''}>{this.state.result}</Box>
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
      this.clipboard.on('success', (e) => {
        this.setState({ result: 'copied!' });
        setTimeout(() => {
          this.setState({ result: '' });
        }, 1000);
      });
      this.clipboard.on('error', (e) => {
        this.setState({ result: 'error.' });
      });
    }
  }

  public componentWillUnmount() {
    this.clipboard.destroy();
  }
}

export default ClipboardComponent;
