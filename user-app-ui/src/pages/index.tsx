// src/pages/index.tsx

import React from 'react';

import Layout from '../components/layout/Layout';
import UsersList from '../components/users/UsersList';

const HomePage: React.FC = () => {
  return (
    <Layout title="User | Home">
      <UsersList />
    </Layout>
  );
};

export default HomePage;
