// src/pages/users/edit/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../components/users/UserForm';
import SkeletonUserForm from '../../../components/users/SkeletonUserForm';
import Layout from '../../../components/layout/Layout';
import useUserDetails from '../../../hooks/useUserDetails';
import { updateUser } from '../../../features/users/usersAPI';

const UserEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { user, isLoading, error } = useUserDetails(id);

  if (isLoading) {
    return (
      <Layout title="Edit User">
        <SkeletonUserForm />
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout title="Edit User">
        <div>{error || "User not found"}</div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit User">
      <UserForm
        user={user}
        onSuccess={() => router.push(`/users/details/${user._id}`)}
        onSave={(userData) => updateUser(user._id, userData)}
      />
    </Layout>
  );
};

export default UserEditPage;
