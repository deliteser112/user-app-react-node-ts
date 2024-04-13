// src/pages/users/details/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import SkeletonUserDetail from '../../../components/users/SkeletonUserDetail';
import useUserDetails from '../../../hooks/useUserDetails';

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { user, isLoading, error } = useUserDetails(id);

  if (isLoading) {
    return (
      <Layout title="User | Details">
        <div className="max-w-4xl mx-auto p-5 shadow rounded-lg mt-10">
          <SkeletonUserDetail />
        </div>
      </Layout>
    )
  }

  if (error || !user) {
    return (
      <Layout title="User | Details">
        <div className="max-w-4xl mx-auto p-5 shadow rounded-lg mt-10">
          <div className="text-center my-10">{error || "User not found"}</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="User | Details">
      <div className="max-w-4xl mx-auto p-5 shadow rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-5">User Details</h2>
        <div className="mb-4"><span className="text-gray-600 font-medium">Name:</span> {user.name}</div>
        <div className="mb-4"><span className="text-gray-600 font-medium">Email:</span> {user.email}</div>
        <div className="mb-8"><span className="text-gray-600 font-medium">Age:</span> {user.age}</div>
        <div className="flex justify-end">
          <button onClick={() => router.push(`/users/edit/${user._id}`)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit User</button>
          <button onClick={() => router.push("/")} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 ml-2 rounded">View List</button>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetailsPage;
