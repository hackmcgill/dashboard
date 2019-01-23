import { Account, Hacker, Sponsor } from '../api';

import { HackerStatus, IAccount, IHacker, ISponsor, UserType } from '../config';

export function userCanAccessCreateApplicationPage(user: IAccount) {
  return user.confirmed && user.accountType === UserType.HACKER;
}

export function userCanAccessHackerPage(user: IAccount) {
  return (
    user.confirmed &&
    (user.accountType === UserType.STAFF ||
      user.accountType === UserType.VOLUNTEER ||
      isSponsor(user))
  );
}

export function isSponsor(user: IAccount) {
  return (
    [
      UserType.SPONSOR_T1,
      UserType.SPONSOR_T2,
      UserType.SPONSOR_T3,
      UserType.SPONSOR_T4,
      UserType.SPONSOR_T5,
    ].indexOf(user.accountType) !== -1
  );
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const userInfo = await getUserInfo();
    return Boolean(userInfo);
  } catch (error) {
    return false;
  }
}

/**
 * Returns whether the current user is confirmed
 */
export async function isConfirmed(): Promise<boolean> {
  try {
    const response = await Account.getSelf();
    const user = response.data.data;
    return Boolean(user) && user.confirmed;
  } catch (error) {
    return false;
  }
}

export async function getUserInfo(): Promise<IAccount | null> {
  try {
    const response = await Account.getSelf();
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export async function getHackerInfo(): Promise<IHacker | null> {
  try {
    const response = await Hacker.getSelf();
    return response.data.data;
  } catch (error) {
    return null;
  }
}
export function isAppOpen(): boolean {
  return false;
}

export async function getSponsorInfo(): Promise<ISponsor | null> {
  try {
    const response = await Sponsor.getSelf();
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export function canAccessApplication(hacker?: IHacker): boolean {
  const APPS_OPEN = isAppOpen();
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;

  return (
    APPS_OPEN &&
    (status === HackerStatus.HACKER_STATUS_NONE ||
      status === HackerStatus.HACKER_STATUS_APPLIED)
  );
}

export function canAccessTeam(hacker?: IHacker): boolean {
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;

  return (
    status === HackerStatus.HACKER_STATUS_APPLIED ||
    status === HackerStatus.HACKER_STATUS_ACCEPTED ||
    status === HackerStatus.HACKER_STATUS_CONFIRMED ||
    status === HackerStatus.HACKER_STATUS_CHECKED_IN
  );
}

export function canAccessBus(hacker?: IHacker): boolean {
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;
  return hacker
    ? Boolean(hacker.needsBus) &&
        (status === HackerStatus.HACKER_STATUS_APPLIED ||
          status === HackerStatus.HACKER_STATUS_ACCEPTED ||
          status === HackerStatus.HACKER_STATUS_CONFIRMED ||
          status === HackerStatus.HACKER_STATUS_CHECKED_IN)
    : false;
}
