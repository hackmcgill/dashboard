import { Flex } from '@rebass/grid';
import React from 'react';
import { Image } from '../../shared/Elements';

import Facebook from '../../assets/images/fb-logo.svg';
import GitHub from '../../assets/images/github-logo.svg';
import Instagram from '../../assets/images/ig-logo.svg';
import Twitter from '../../assets/images/twitter-logo.svg';

const SocialMediaBar: React.FC = () => {
  return (
    <Flex alignItems={'center'} pr={'30px'}>
      <div className="social-icon">
        <a
          href="https://www.facebook.com/mcgillhacks/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Facebook} height="24px" />
        </a>
      </div>

      <div className="social-icon">
        <a
          href="https://www.instagram.com/mcgillhacks/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Instagram} height="24px" />
        </a>
      </div>

      <div className="social-icon">
        <a
          href="https://twitter.com/McGillHacks?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Twitter} height="24px" />
        </a>
      </div>

      <div className="social-icon">
        <a
          href="https://github.com/hackmcgill"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={GitHub} height="24px" />
        </a>
      </div>
      <style jsx={true}>
        {`
          .social-icon {
            padding-right: 20px;
            transition: filter 0.25s ease-in;
          }

          .social-icon:hover {
            filter: invert(41%) sepia(9%) saturate(3131%) hue-rotate(197deg)
              brightness(92%) contrast(84%);
          }

          .social-icon a {
            display: flex;
          }
        `}
      </style>
    </Flex>
  );
};

export default SocialMediaBar;
