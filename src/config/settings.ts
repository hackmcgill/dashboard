import { SortingRule } from 'react-table';

export interface ISetting {
  APPLICATION_CLOSE: string;
  APPLICATION_CONFIRM: string;
  APPLICATION_OPEN: string;
  HACKATHON_YEAR: string;
  IS_REMOTE: boolean;
  SOCIAL_MEDIA_DEVPOST: string;
  SOCIAL_MEDIA_DISCORD: string;
  SOCIAL_MEDIA_EMAIL: string;
  SOCIAL_MEDIA_FACEBOOK: string;
  SOCIAL_MEDIA_INSTAGRAM: string;
  SOCIAL_MEDIA_TWITTER: string;
}

export const defaultSettings: ISetting = {
  APPLICATION_CLOSE: new Date().valueOf().toString(),
  APPLICATION_CONFIRM: new Date().valueOf().toString(),
  APPLICATION_OPEN: new Date().valueOf().toString(),
  HACKATHON_YEAR: '',
  IS_REMOTE: false,
  SOCIAL_MEDIA_DEVPOST: '',
  SOCIAL_MEDIA_DISCORD: '',
  SOCIAL_MEDIA_EMAIL: '',
  SOCIAL_MEDIA_FACEBOOK: '',
  SOCIAL_MEDIA_INSTAGRAM: '',
  SOCIAL_MEDIA_TWITTER: '',
};
