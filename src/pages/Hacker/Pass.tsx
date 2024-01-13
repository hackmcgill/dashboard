import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Account, Hacker } from '../../api';
import { IAccount, IHacker } from '../../config';
import { Pass } from '../../features/HackPass/Pass';
import { SubmitBtn } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import { generateHackerQRCode, generateHackPass } from '../../util';

const HackPassWrapper = styled.div`
  max-width: 320px;
  margin-top: 100px;
  margin: auto;
  text-align: center;

  h1 {
    margin-top: 60px;
    margin-bottom: 20px;
    font-weight: normal;
    color: ${(props) => props.theme.colors.red};
  }

  .pass {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);

    .info {
      background: ${(props) => props.theme.colors.black5};
      padding-top: 20px;
      padding-bottom: calc(20px + 38px / 2);
      border-radius: 0 0 8px 8px;

      h2 {
        font-size: 1.6em;
        margin: 0;
        margin-bottom: 10px;
      }

      h3 {
        font-weight: normal;
        margin: 0;
      }
    }

    .qrCode {
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  }

  button[type='submit'] {
    position: relative;
    top: calc(-50px - 38px / 2);
  }
`;

const HackPassPage: React.FC = () => {
  // Store the user's data
  const [account, setAccount] = useState<IAccount | null>(null);
  const [hacker, setHacker] = useState<IHacker | null>(null);
  const [qrData, setQrData] = useState<string>('');

  // Is the hacker data currently being fetched from server?
  const [loadingHacker, setLoadingHacker] = useState<boolean>(true);

  // Is the pass currently being downloaded
  const [downloadingPass, setDownloadingPass] = useState<boolean>(false);

  // When the component mounts, fetch data associate with this hacker from server
  useEffect(() => {
    (async () => {
      try {
        const account = (await Account.getSelf()).data.data;
        const hacker = (await Hacker.getSelf()).data.data;
        const qrData = await generateHackerQRCode(hacker);
        setAccount(account);
        setHacker(hacker);
        setQrData(qrData);
      } catch (e: any) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
      } finally {
        setLoadingHacker(false);
      }
    })();
  }, []);

  // Generage hackpass pdf and download it to the user's computer
  const handleDownloadPass = async (): Promise<void> => {
    if (!hacker || !account) {
      return;
    }
    setDownloadingPass(true);
    await generateHackPass(account, hacker);
    setDownloadingPass(false);
  };

  // If user's data has loaded succesfully, display the page to them
  if (qrData && account && hacker) {
    return (
      <HackPassWrapper>
        <h1>Your HackPass</h1>
        <Pass account={account} hacker={hacker} qrData={qrData} />
        <SubmitBtn onClick={handleDownloadPass} isLoading={downloadingPass}>
          Download pass
        </SubmitBtn>
      </HackPassWrapper>
    );
  }

  // If still loading, display loading message
  else if (loadingHacker) {
    return (
      <HackPassWrapper>
        <h1>Loading...</h1>
      </HackPassWrapper>
    );
  }

  // If not loading anymore, but some of user's data is missing, display an error
  else {
    return (
      <HackPassWrapper>
        <h1>Error</h1>
      </HackPassWrapper>
    );
  }
};

export default HackPassPage;
