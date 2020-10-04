import * as React from 'react';

import { Flex } from '@rebass/grid';
import { FrontendRoute, HackerStatus, ISetting } from '../../config';
import * as CONSTANTS from '../../config/constants';
import { Button, LinkDuo, Paragraph } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import { date2human } from '../../util';

/**
 * These enums represent states + actions in this diagram: https://bit.ly/3ldYbgV.
 * These differ from HackerStatus in that HackerStatus does not incorporate time-based information.
 */
enum DetailedState {
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

  const action = GetDetailedState(status, settings);
  switch (action) {
    case DetailedState.NONE_CANNOT_YET_APPLY:
      return <div />;
    case DetailedState.NONE_CAN_APPLY:
      text = CONSTANTS.NONE_STATUS_TEXT;
      buttons = [applyButton];
      break;
    case DetailedState.NONE_MISSED_DEADLINE:
      text = CONSTANTS.DEADLINE_PASSED_LABEL;
      break;
    case DetailedState.APPLIED:
      text = CONSTANTS.APPLIED_STATUS_TEXT;
      buttons = [editAppButton];
      break;
    case DetailedState.ACCEPTED_CAN_CONFIRM_OR_WITHDRAW:
      text = `${CONSTANTS.ACCEPTED_STATUS_TEXT}${' '}
      ${CONSTANTS.RSVP_DEADLINE_TEXT_START}${' '}
      ${date2human(settings.confirmTime)}${' '}
      ${CONSTANTS.RSVP_DEADLINE_TEXT_END}`;
      buttons = [confirmButton, withdrawButton];
      break;
    case DetailedState.ACCEPTED_MISSED_DEADLINE:
      text = CONSTANTS.DECISION_DEADLINE_PASSED_LABEL;
      break;
    case DetailedState.DECLINED:
      text = CONSTANTS.DECLINED_STATUS_TEXT;
      break;
    case DetailedState.WAITLISTED:
      text = CONSTANTS.WAITLISTED_STATUS_TEXT;
      break;
    case DetailedState.CONFIRMED:
      text = CONSTANTS.CONFIRMED_STATUS_TEXT;
      buttons = [hackPassButton, travelButton, withdrawButton];
      break;
    case DetailedState.CHECKED_IN:
      text = CONSTANTS.CHECKED_IN_STATUS_TEXT;
      buttons = [liveSiteButton];
      break;
    case DetailedState.WITHDRAWN:
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

/**
 * Gets the time-aware status of a given hacker.
 * This is important for knowing which text to show to the hacker, as well as which buttons to display.
 * @param status HackerStatus the status of the current hacker
 * @param settings the settings of this hackathon
 */
function GetDetailedState(
  status: HackerStatus,
  settings: ISetting
): DetailedState {
  const now = new Date();
  const openTime = new Date(settings.openTime);
  const closeTime = new Date(settings.closeTime);
  const confirmTime = new Date(settings.confirmTime);

  const inPreApplyWindow = now < openTime;
  const inApplyWindow = now > openTime && now < closeTime;
  const inConfirmWindow = now < confirmTime;

  if (status === HackerStatus.HACKER_STATUS_NONE) {
    if (inPreApplyWindow) {
      return DetailedState.NONE_CANNOT_YET_APPLY;
    } else if (inApplyWindow) {
      return DetailedState.NONE_CAN_APPLY;
    } else {
      return DetailedState.NONE_MISSED_DEADLINE;
    }
  } else if (status === HackerStatus.HACKER_STATUS_APPLIED) {
    return DetailedState.APPLIED;
  } else if (status === HackerStatus.HACKER_STATUS_ACCEPTED) {
    if (inConfirmWindow) {
      // This is any time before the confirmation date
      return DetailedState.ACCEPTED_CAN_CONFIRM_OR_WITHDRAW;
    } else {
      return DetailedState.ACCEPTED_MISSED_DEADLINE;
    }
  } else if (status === HackerStatus.HACKER_STATUS_DECLINED) {
    return DetailedState.DECLINED;
  } else if (status === HackerStatus.HACKER_STATUS_WAITLISTED) {
    return DetailedState.WAITLISTED;
  } else if (status === HackerStatus.HACKER_STATUS_CONFIRMED) {
    return DetailedState.CONFIRMED;
  } else if (status === HackerStatus.HACKER_STATUS_CHECKED_IN) {
    return DetailedState.CHECKED_IN;
  } else if (status === HackerStatus.HACKER_STATUS_WITHDRAWN) {
    return DetailedState.WITHDRAWN;
  }
  console.warn('Unknown hacker state');
  return DetailedState.NONE_MISSED_DEADLINE;
}

export default StatusHeader;
