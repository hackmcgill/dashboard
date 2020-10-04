import * as React from 'react';

import { Flex } from '@rebass/grid';
import { FrontendRoute, HackerStatus, ISetting } from '../../config';
import * as CONSTANTS from '../../config/constants';
import { Button, LinkDuo, Paragraph } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import { date2human } from '../../util';

// These call-to-actions represent states + arrows in this diagram: https://bit.ly/3ldYbgV
enum CallToAction {
  NONE_CANNOT_YET_APPLY,
  NONE_CAN_APPLY,
  NONE_MISSED_DEADLINE,
  APPLIED,
  ACCEPTED_CAN_CONFIRM_OR_WITHDRAW,
  ACCEPTED_MISSED_DEADLINE,
  DECLINED,
  WAITLISTED,
  CONFIRMED,
  CHECKED_IN,
  WITHDRAWN,
}

interface IStatusHeaderProps {
  status: HackerStatus;
  settings: ISetting;
  onClickConfirm: (e: any) => Promise<void>;
  onClickWithdraw: (e: any) => Promise<void>;
}

const StatusHeader: React.SFC<IStatusHeaderProps> = ({
  status,
  settings,
  onClickConfirm,
  onClickWithdraw,
}) => {
  const confirmButton = (
    <Button type="button" onClick={onClickConfirm}>
      Confirm
    </Button>
  );
  const withdrawButton = (
    <Button type="button" onClick={onClickWithdraw}>
      Withdraw
    </Button>
  );
  const applyButton = (
    <LinkDuo to={FrontendRoute.CREATE_APPLICATION_PAGE}>
      <Button type="button">Apply</Button>
    </LinkDuo>
  );
  const editAppButton = (
    <LinkDuo to={FrontendRoute.EDIT_APPLICATION_PAGE}>
      <Button type="button">View/Edit Application</Button>
    </LinkDuo>
  );
  const liveSiteButton = (
    /* link not made yet */
    <LinkDuo to={FrontendRoute.CREATE_APPLICATION_PAGE}>
      <Button type="button">Live Site</Button>
    </LinkDuo>
  );
  const hackPassButton = (
    <LinkDuo to={FrontendRoute.PASS_HACKER_PAGE}>
      <Button type="button">Hack Pass</Button>
    </LinkDuo>
  );
  const travelButton = (
    <LinkDuo to={FrontendRoute.TRAVEL_PAGE}>
      <Button type="button">Travel Page</Button>
    </LinkDuo>
  );

  let text = '';
  let buttons: JSX.Element[] = [];

  const action = GetCallToAction(status, settings);
  switch (action) {
    case CallToAction.NONE_CANNOT_YET_APPLY:
      return <div />;
    case CallToAction.NONE_CAN_APPLY:
      text = CONSTANTS.NONE_STATUS_TEXT;
      buttons = [applyButton];
      break;
    case CallToAction.NONE_MISSED_DEADLINE:
      text = CONSTANTS.DEADLINE_PASSED_LABEL;
      break;
    case CallToAction.APPLIED:
      text = CONSTANTS.APPLIED_STATUS_TEXT;
      buttons = [editAppButton];
      break;
    case CallToAction.ACCEPTED_CAN_CONFIRM_OR_WITHDRAW:
      text = `${CONSTANTS.ACCEPTED_STATUS_TEXT}${' '}
      ${CONSTANTS.RSVP_DEADLINE_TEXT_START}${' '}
      ${date2human(settings.confirmTime)}${' '}
      ${CONSTANTS.RSVP_DEADLINE_TEXT_END}`;
      buttons = [confirmButton, withdrawButton];
      break;
    case CallToAction.ACCEPTED_MISSED_DEADLINE:
      text = CONSTANTS.DECISION_DEADLINE_PASSED_LABEL;
      break;
    case CallToAction.DECLINED:
      text = CONSTANTS.DECLINED_STATUS_TEXT;
      break;
    case CallToAction.WAITLISTED:
      text = CONSTANTS.WAITLISTED_STATUS_TEXT;
      break;
    case CallToAction.CONFIRMED:
      text = CONSTANTS.CONFIRMED_STATUS_TEXT;
      buttons = [hackPassButton, travelButton, withdrawButton];
      break;
    case CallToAction.CHECKED_IN:
      text = CONSTANTS.CHECKED_IN_STATUS_TEXT;
      buttons = [liveSiteButton];
      break;
    case CallToAction.WITHDRAWN:
      text = CONSTANTS.WITHDRAWN_STATUS_TEXT;
      break;
  }
  return (
    <Flex
      flexDirection={'column'}
      style={{ marginTop: '1em' }}
      alignItems={'center'}
    >
      <Paragraph
        color={theme.colors.black80}
        textAlign={'center'}
        marginBottom={'3rem'}
      >
        {text}
      </Paragraph>
      <Flex flexDirection={'row'} justifyContent={'space-around'}>
        {insertMargin(buttons)}
      </Flex>
    </Flex>
  );
};

function insertMargin(buttons: JSX.Element[]) {
  const margin = <div style={{ marginRight: '20px' }} />;
  const buttonsWithMargin: JSX.Element[] = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonsWithMargin.push(buttons[i]);
    if (i < buttons.length - 1) {
      buttonsWithMargin.push(margin);
    }
  }
  return buttonsWithMargin;
}

function GetCallToAction(
  status: HackerStatus,
  settings: ISetting
): CallToAction {
  const now = new Date();
  const openTime = new Date(settings.openTime);
  const closeTime = new Date(settings.closeTime);
  const confirmTime = new Date(settings.confirmTime);

  const inPreApplyWindow = now < openTime;
  const inApplyWindow = now > openTime && now < closeTime;
  const inConfirmWindow = now < confirmTime;

  if (status === HackerStatus.HACKER_STATUS_NONE) {
    if (inPreApplyWindow) {
      return CallToAction.NONE_CANNOT_YET_APPLY;
    } else if (inApplyWindow) {
      return CallToAction.NONE_CAN_APPLY;
    } else {
      return CallToAction.NONE_MISSED_DEADLINE;
    }
  } else if (status === HackerStatus.HACKER_STATUS_APPLIED) {
    return CallToAction.APPLIED;
  } else if (status === HackerStatus.HACKER_STATUS_ACCEPTED) {
    if (inConfirmWindow) {
      // This is any time before the confirmation date
      return CallToAction.ACCEPTED_CAN_CONFIRM_OR_WITHDRAW;
    } else {
      return CallToAction.ACCEPTED_MISSED_DEADLINE;
    }
  } else if (status === HackerStatus.HACKER_STATUS_DECLINED) {
    return CallToAction.DECLINED;
  } else if (status === HackerStatus.HACKER_STATUS_WAITLISTED) {
    return CallToAction.WAITLISTED;
  } else if (status === HackerStatus.HACKER_STATUS_CONFIRMED) {
    return CallToAction.CONFIRMED;
  } else if (status === HackerStatus.HACKER_STATUS_CHECKED_IN) {
    return CallToAction.CHECKED_IN;
  } else if (status === HackerStatus.HACKER_STATUS_WITHDRAWN) {
    return CallToAction.WITHDRAWN;
  }
  console.warn('Unknown hacker state');
  return CallToAction.NONE_MISSED_DEADLINE;
}

export default StatusHeader;
