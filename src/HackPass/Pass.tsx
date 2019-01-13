import * as React from 'react';

import { H1, Image, MaxWidthBox } from '../shared/Elements';
import { SubmitBtn } from '../shared/Form';

interface IPassProps {
  qrData: string;
  onDownloadPass: () => void;
  isDownloading: boolean;
}

export const Pass: React.StatelessComponent<IPassProps> = (
  props: IPassProps
) => {
  return (
    <MaxWidthBox maxWidth={'500px'} m={'auto'}>
      <H1 textAlign={'center'}>Your Pass:</H1>
      <Image src={props.qrData} imgWidth={'100%'} />
      <SubmitBtn onClick={props.onDownloadPass} isLoading={props.isDownloading}>
        Download pass
      </SubmitBtn>
    </MaxWidthBox>
  );
};
