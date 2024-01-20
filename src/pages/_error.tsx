import React from 'react';
import Helmet from 'react-helmet';
import { LinkDuo } from '../shared/Elements';

import { FrontendRoute, HACKATHON_NAME } from '../config';

import Button, { ButtonVariant } from '../shared/Elements/Button';
import H1 from '../shared/Elements/H1';
import Paragraph from '../shared/Elements/Paragraph';

/**
 * Container that renders 404 not found page.
 */
const NotFoundPage: React.FC = () => (
  <>
    <Helmet>
      <title>Page not found | {HACKATHON_NAME}</title>
    </Helmet>

    <div className="container">
      <H1 marginBottom="0">404: Page not found</H1>
      <Paragraph>
        The page you're looking for doesn't exists or has been moved
      </Paragraph>

      <LinkDuo to={FrontendRoute.HOME_PAGE}>
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          isOutlined={true}
        >
          Click to go home
        </Button>
      </LinkDuo>
    </div>

    <style jsx={true}>{`
      .container {
        width: 440px;
        margin: auto;
        padding-top: 30px;
        padding-bottom: 120px;
      }
    `}</style>
  </>
);

export default NotFoundPage;
