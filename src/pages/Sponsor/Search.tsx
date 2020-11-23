import React from 'react';
import Helmet from 'react-helmet';

import SearchContainer from '../../features/Search/Search';
import { HACKATHON_NAME } from '../../config';
const SponsorSearchPage: React.FC = () => (
  <div>
    <Helmet>
      <title> Search | {HACKATHON_NAME}</title>
    </Helmet>
    <SearchContainer />
  </div>
);

export default SponsorSearchPage;
