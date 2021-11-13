import * as React from 'react';

import { IAccount, IHacker } from '../../config';

interface IPassProps {
  account: IAccount;
  hacker: IHacker;
  qrData: string;
}

export const Pass: React.StatelessComponent<IPassProps> = (
  props: IPassProps
) => {
  return (
    <div className="pass">
      <img src={props.qrData} className="qrCode" alt="" />
      <div className="info">
        <h2>{props.account.firstName}</h2>
        <h3>{props.hacker.application.demographics.pronoun}</h3>
        <h3>{props.hacker.application.general.school}</h3>
      </div>
    </div>
  );
};
