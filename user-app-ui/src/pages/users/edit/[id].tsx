// src/pages/users/edit/[id].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  updateUser,
  findUserById,
} from "../../../features/users/usersAPI";
import UserForm from "../../../components/users/UserForm";
import SkeletonUserForm from "../../../components/users/SkeletonUserForm";
import Layout from "../../../components/layout/Layout";

import { User } from '../../../types/user';

const UserEditPage: React.FC = () => {
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
      <Layout title="Edit User">
        <SkeletonUserForm />
      </Layout>
    );
  }

  if (!user) {
    // Consider showing an error message or a not found message
    return (
      <Layout title="Edit User">
        <div>User not found</div>
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
