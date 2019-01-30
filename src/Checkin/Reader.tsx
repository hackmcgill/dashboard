import * as React from 'react';
import QrReader from 'react-qr-reader';

interface IReaderProps {
  onScan: (data: string | null) => void;
  onError: (err: any) => void;
}

export const Reader: React.StatelessComponent<IReaderProps> = (
  props: IReaderProps
) => {
  return (
    <QrReader
      delay={500}
      onError={props.onError}
      onScan={props.onScan}
      style={{ width: '100%' }}
    />
  );
};
