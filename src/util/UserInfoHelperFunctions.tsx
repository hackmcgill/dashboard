import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';
import { Account, Hacker, Settings, Sponsor } from '../api';
import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  IHacker,
  ISetting,
  ISponsor,
  UserType,
} from '../config';
import addBrownBoldFont from './jsPDF-brown-bold-font';
import addBrownFont from './jsPDF-brown-font';
import addHindFont from './jsPDF-hind-font';

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

export async function getSettings(): Promise<ISetting | null> {
  try {
    const response = await Settings.get();
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export function isAppOpen(settings?: ISetting): boolean {
  if (!settings) {
    return false;
  }
  const now = new Date();
  const open = new Date(settings.openTime);
  const close = new Date(settings.closeTime);
  return now > open && now < close;
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

export function canAccessApplication(
  hacker?: { status: HackerStatus }, // Only outline as much as we need here.
  settings?: ISetting
): boolean {
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;
  // If applications are open and a user has not yet sent in an app, let them do so.
  // Hackers who have submitted an application AND is not waitlisted should be able to see their app.
  return (
    (isAppOpen(settings) && status === HackerStatus.HACKER_STATUS_NONE) ||
    status !== HackerStatus.HACKER_STATUS_WAITLISTED
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

export function canAccessTravel(hacker?: IHacker): boolean {
  const status = hacker ? hacker.status : HackerStatus.HACKER_STATUS_NONE;

  if (
    status === HackerStatus.HACKER_STATUS_APPLIED ||
    status === HackerStatus.HACKER_STATUS_ACCEPTED ||
    status === HackerStatus.HACKER_STATUS_CONFIRMED ||
    status === HackerStatus.HACKER_STATUS_CHECKED_IN
  ) {
    return !!(hacker && hacker.application && hacker.application.accommodation);
  }
  return false;
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
  // Initialize label sized document
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [59, 102],
  });

  // Load custom fonts
  addBrownFont(doc);
  addBrownBoldFont(doc);
  await addHindFont(doc);

  /*doc.setDrawColor(0)
  doc.setFillColor(230)
  doc.rect(0, 9.5, 22, 40, 'F')

  let writeCenteredText = (text: string, y: number) => {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  // Write the hacker's name and pronouns
  doc.setFont('brown');
  doc.setFontStyle('bold');
  doc.setFontSize(4);
  writeCenteredText(`${account.firstName} ${account.lastName}`, 22.5);
  doc.setFontSize(3);
  writeCenteredText(account.accountType.toUpperCase(), 2);


  doc.setFont('hind');
  doc.setFontStyle('normal');


  // Write the school the hacker is from
  doc.setFont('hind');
  doc.setFontStyle('normal');
  doc.setFontSize(3);
  doc.setTextColor(0);

  doc.setDrawColor(200);
  doc.setLineWidth(0.1);
  doc.line(4, 23.2, 17, 23.2);
  doc.line(4, 26.7, 17, 26.7);
  doc.setFontSize(3);

  writeCenteredText(account.pronoun, 24.5);
  writeCenteredText(hacker.application.general.school, 26);
  writeCenteredText('McHacks 2020', 34.5);

  const qrData = await generateHackerQRCode(hacker);
  doc.addImage(qrData, 'png', 4, 2.5, 13, 13);*/

  // Add red bar for design purposes
  /*doc.setDrawColor(0)
  doc.setFillColor(242, 70, 58)
  doc.rect(0, 0, 36, 9, 'F')*/

  // Write the hacker's name and pronouns
  doc.setFont('brown');
  doc.setFontStyle('bold');
  doc.setFontSize(5);
  doc.setTextColor(0);
  doc.text(`${account.firstName} ${account.lastName}`, 3, 6);

  doc.setFont('hind');
  doc.setFontStyle('normal');
  doc.setFontSize(4);
  doc.setTextColor(0);
  doc.text('', 3, 8);

  doc.setFont('hind');
  doc.setFontStyle('normal');
  doc.setFontSize(3);
  doc.setTextColor(0);
  doc.text(account.pronoun, 3, 8);

  // Write the school the hacker is from
  doc.setFont('hind');
  doc.setFontStyle('normal');
  doc.setFontSize(4);
  doc.setTextColor(0);

  doc.text(account.accountType, 3, 13.5);
  doc.text(hacker.application.general.school, 3, 15.8);

  const qrData = await generateHackerQRCode(hacker);
  doc.addImage(qrData, 'png', 20, 3.5, 14, 14);

  doc.autoPrint();
  doc.save(`hackPass_${hacker.id}.pdf`);
  return doc;
}
