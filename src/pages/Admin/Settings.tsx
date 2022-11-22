import { Box, Flex } from '@rebass/grid';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { Settings } from '../../api/settings';
import { defaultSettings, HACKATHON_NAME, ISetting } from '../../config';
import SettingsForm from '../../features/Settings/SettingsForm';
import { ConfirmModal, H1, MaxWidthBox } from '../../shared/Elements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToaster from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<ISetting>(defaultSettings);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getSettings(setSettings);
  }, []);

  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Helmet title={`Settings | ${HACKATHON_NAME}`} />
      <MaxWidthBox mt={'2em'}>
        <H1
          color={theme.colors.red}
          display={'absolute'}
          textAlign={'center'}
          marginLeft={'0'}
        >
          {HACKATHON_NAME} Settings
        </H1>
        <SettingsForm
          settings={settings}
          // tslint:disable-next-line: jsx-no-lambda
          submit={(newSettings) => {
            setIsModalOpen(true);
            setSettings(newSettings);
          }}
        />
      </MaxWidthBox>
      <ConfirmModal
        isOpen={isModalOpen}
        // tslint:disable-next-line: jsx-no-lambda
        onCanceled={() => setIsModalOpen(false)}
        // tslint:disable-next-line: jsx-no-lambda
        onConfirmed={() => {
          patchSettings(settings);
          setIsModalOpen(false);
        }}
      >
        <Box alignSelf={'center'}>
          Are you sure you want to make these changes?
        </Box>
        <Box mb={'10px'} alignSelf={'center'}>
          This will change the hackathon settings.
        </Box>
      </ConfirmModal>
    </Flex>
  );
};

async function getSettings(callback: (settings: ISetting) => void) {
  try {
    const settings: ISetting = (await Settings.get()).data.data;
    callback(settings);
  } catch (e) {
    if (e && e.data) {
      ValidationErrorGenerator(e.data);
    }
  }
}

async function patchSettings(newSettings: Partial<ISetting>) {
  try {
    await Settings.update(newSettings);
    toast.success('Settings updated');
  } catch (e) {
    if (e && e.data) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default WithToaster(SettingsPage);
