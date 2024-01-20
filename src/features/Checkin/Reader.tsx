import * as React from 'react';
import { useZxing } from 'react-zxing';
import styled from 'styled-components';

interface IReaderProps {
  onScan: (data: string | null) => void;
  onError: (err: any) => void;
}

const Viewport = styled.div`
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  border: 50px solid rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 0 5px rgba(255, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  top: 0;
  left: 0;
  display: block;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Reader: React.FunctionComponent<IReaderProps> = (
  props: IReaderProps
) => {
  const { ref } = useZxing({
    onDecodeResult: (result) => props.onScan(result.getText()),
    onError: props.onError,
    onDecodeError: props.onError,
    timeBetweenDecodingAttempts: 500,
  });

  return (
    <section style={{ width: '100%' }}>
      <section
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
        }}
      >
        <Viewport />
        <Video ref={ref} />
      </section>
    </section>
  );
};
