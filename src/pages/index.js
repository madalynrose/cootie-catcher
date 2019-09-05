import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Catcher from '../components/catcher';

const IndexPage = () => {
  return (
    <Layout>
      <Catcher />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
