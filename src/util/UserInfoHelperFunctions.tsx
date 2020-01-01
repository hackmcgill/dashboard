import { Account, Hacker, Sponsor } from '../api';

import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  IHacker,
  ISponsor,
  UserType,
} from '../config';

import * as QRCode from 'qrcode';

import jsPDF from 'jspdf';

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
  return true;
}

export function isConfirmationOpen(): boolean {
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
      status !== HackerStatus.HACKER_STATUS_WAITLISTED)
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
    ? Boolean(hacker.travel) &&
        (status === HackerStatus.HACKER_STATUS_APPLIED ||
          status === HackerStatus.HACKER_STATUS_ACCEPTED ||
          status === HackerStatus.HACKER_STATUS_CONFIRMED ||
          status === HackerStatus.HACKER_STATUS_CHECKED_IN)
    : false;
}

export function canAccessHackerPass(hacker?: IHacker): boolean {
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;

  return (
    status === HackerStatus.HACKER_STATUS_ACCEPTED ||
    status === HackerStatus.HACKER_STATUS_CONFIRMED ||
    status === HackerStatus.HACKER_STATUS_WITHDRAWN ||
    status === HackerStatus.HACKER_STATUS_CHECKED_IN
  );
}

/**
 * Generate a QR code for a given hacker.
 * @param hacker The hacker you wanna generate the code for
 * @returns an svg string.
 */
export async function generateHackerQRCode(hacker: IHacker): Promise<string> {
  const hackerPage = `
  ${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ':' + window.location.port : ''
  }${FrontendRoute.VIEW_HACKER_PAGE.replace(':id', hacker.id)}`;
  const response = await QRCode.toDataURL(hackerPage, { scale: 10 });
  return response;
}

/**
 * Generate a QR code for a given hacker.
 * @param hacker The hacker you wanna generate the code for
 * @returns an svg string.
 */
export async function generateHackPass(
  account: IAccount,
  hacker: IHacker
): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [59, 102],
  });
  doc.setFontSize(6);
  doc.setFontStyle('bold');
  doc.text(account.accountType.toUpperCase(), 1.5, 4, { maxWidth: 18 });

  doc.setFontSize(7);
  const name: string[] = doc.splitTextToSize(
    `${account.firstName} ${account.lastName}`,
    19
  );
  doc.text(1.5, 8, name);

  doc.setFontStyle('normal');
  doc.setFontSize(4);
  const pronoun: string[] = doc.splitTextToSize(account.pronoun, 19);
  const school: string[] = doc.splitTextToSize(`${hacker.school}`, 19);
  doc.text(1.5, 7.5 + name.length * 3, pronoun.concat(school));

  const qrData = await generateHackerQRCode(hacker);
  doc.addImage(qrData, 'png', 21, 3, 15, 15);

  doc.autoPrint();
  doc.save(`hackPass_${hacker.id}.pdf`);
  return doc;
}
