import { Flex } from '@rebass/grid';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Settings } from '../../api/settings';
import { HACKATHON_NAME, ISetting } from '../../config';
import { H1, MaxWidthBox } from '../../shared/Elements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToaster from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';

const SettingsContainer: React.FC = () => {
  const [settings, setSettings] = useState<ISetting>({
    openTime: '',
    closeTime: '',
    confirmTime: '',
  });
  useEffect(() => {
    getSettings(setSettings);
  }, []);
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Helmet>
        <title>Settings | {HACKATHON_NAME}</title>
      </Helmet>
      <MaxWidthBox mt={'2em'}>
        <H1
          color={theme.colors.red}
          display={'absolute'}
          textAlign={'center'}
          marginLeft={'0'}
        >
          {HACKATHON_NAME} Settings
        </H1>
        {settings.openTime},{settings.closeTime},{settings.confirmTime},
      </MaxWidthBox>
    </Flex>
  );
};

async function getSettings(setSettings: (settings: ISetting) => void) {
  try {
    const settings: ISetting = (await Settings.get()).data.data;
    setSettings(settings);
  } catch (e) {
    if (e && e.data) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default WithToaster(SettingsContainer);
