import React from 'react';

import SearchContainer from '../../features/Search/Search';
import Helmet from 'react-helmet';
import { HACKATHON_NAME } from '../../config';
const AdminSearchPage: React.FC = () => (
  <div>
    <Helmet>
      <title> Search | {HACKATHON_NAME}</title>
    </Helmet>
    <SearchContainer />
  </div>
);

export default AdminSearchPage;
