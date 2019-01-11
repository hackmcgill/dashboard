import { Account, Hacker } from '../api';

import { HackerStatus, IAccount, IHacker, UserType } from '../config';

import * as QRCode from 'qrcode';

export function userCanAccessCreateApplicationPage(user: IAccount) {
  return user.confirmed && user.accountType === UserType.HACKER;
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

export function canAccessApplication(hacker?: IHacker): boolean {
  const APPS_OPEN = isAppOpen();
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;

  return (
    APPS_OPEN &&
    (status === HackerStatus.HACKER_STATUS_NONE ||
      status === HackerStatus.HACKER_STATUS_APPLIED)
  );
}

export async function generateHackerQRCode(hacker: IHacker) {
  const response = await QRCode.toString(hacker.id);
  console.log(response);
}
