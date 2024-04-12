// src/pages/users/details/[id].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";
import { findUserById } from "../../../features/users/usersAPI";
import SkeletonUserDetail from "../../../components/users/SkeletonUserDetail";

import { User } from "../../../types/user";

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof id === "string") {
        setIsLoading(true);
        try {
          const userDetails = await findUserById(id);
          setUser(userDetails);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          router.push("/users");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [id, router]);

  if (isLoading) {
    return (
      <Layout title="User | Details">
        <SkeletonUserDetail />
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="User | Details">
        <div>User not found</div>
      </Layout>
    );
  }

  return (
    <Layout title="User | Details">
      <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-5">User Details</h2>
        <div className="mb-4">
          <span className="text-gray-600 font-medium">Name:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-medium">Email:</span> {user.email}
        </div>
        <div className="mb-8">
          <span className="text-gray-600 font-medium">Age:</span> {user.age}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => router.push(`/users/edit/${user._id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Edit User
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            View List
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetailsPage;
