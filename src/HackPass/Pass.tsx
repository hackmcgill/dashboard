import { IAccount, IHacker } from '@hackmcgill/hackerapi-client-ts';
import * as React from 'react';

import { H2, Image, MaxWidthBox } from '../shared/Elements';
import theme from '../shared/Styles/theme';

interface IPassProps {
  account: IAccount;
  hacker: IHacker;
  qrData: string;
}

export const Pass: React.StatelessComponent<IPassProps> = (
  props: IPassProps
) => {
  return (
    <MaxWidthBox maxWidth={'500px'} m={'0px'}>
      <H2 textAlign={'center'} color={theme.colors.greyDark} fontSize={'30px'}>
        {props.account.firstName}
      </H2>
      <H2 textAlign={'center'} color={theme.colors.greyDark}>
        {props.account.pronoun}
      </H2>
      <H2 textAlign={'center'} color={theme.colors.greyDark} marginBottom={'0'}>
        {props.hacker.school}
      </H2>
      <Image src={props.qrData} imgWidth={'100%'} />
    </MaxWidthBox>
  );
};
