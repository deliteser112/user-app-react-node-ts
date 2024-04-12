// src/pages/users/edit/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../../components/layout/Layout";
import { User, updateUser, fetchUsers } from "../../../features/users/usersAPI";
import UserForm from "../../../components/users/UserForm";

const UserEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof id === "string") {
        const users = await fetchUsers();
        const userDetails = users.find((user) => user._id === id);
        if (userDetails) {
          setUser(userDetails);
        } else {
          // Redirect or show error if user not found
          router.push("/users");
        }
      }
    };

    fetchUserDetails();
  }, [id, router]);

  if (!user) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <Layout title="User | Edit">
      <UserForm
        user={user}
        onSuccess={() => router.push(`/users/details/${user._id}`)}
        onSave={(userData) => updateUser(user._id, userData)}
      />
    </Layout>
  );
};

export default UserEditPage;
