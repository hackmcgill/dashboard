import * as React from 'react';

import { IAccount, IHacker } from '../config';
import { H1, H2, Image, MaxWidthBox } from '../shared/Elements';
import { SubmitBtn } from '../shared/Form';
import theme from '../shared/Styles/theme';

interface IPassProps {
  account: IAccount;
  hacker: IHacker;
  qrData: string;
  onDownloadPass: () => void;
  isDownloading: boolean;
}

export const Pass: React.StatelessComponent<IPassProps> = (
  props: IPassProps
) => {
  return (
    <MaxWidthBox maxWidth={'500px'} m={'auto'}>
      <H1 textAlign={'center'}>Your HackPass:</H1>
      <H2 textAlign={'center'} color={theme.colors.greyDark}>
        {props.account.firstName}
      </H2>
      <H2 textAlign={'center'} color={theme.colors.greyDark}>
        {props.account.pronoun}
      </H2>
      <H2 textAlign={'center'} color={theme.colors.greyDark}>
        {props.hacker.school}
      </H2>
      <Image src={props.qrData} imgWidth={'100%'} />
      <SubmitBtn onClick={props.onDownloadPass} isLoading={props.isDownloading}>
        Download pass
      </SubmitBtn>
    </MaxWidthBox>
  );
};
