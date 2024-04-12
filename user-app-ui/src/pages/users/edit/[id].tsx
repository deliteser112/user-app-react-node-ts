// src/pages/users/edit/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, updateUser, fetchUsers } from "../../../features/users/usersAPI";
import UserForm from "../../../components/users/UserForm";
import UserFormSkeleton from "../../../components/users/SkeletonUserForm"; // Import the UserFormSkeleton component
import Layout from "../../../components/layout/Layout";

const UserEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Set loading to true when the fetch starts
      if (typeof id === "string") {
        const users = await fetchUsers();
        const userDetails = users.find((user) => user._id === id);
        if (userDetails) {
          setUser(userDetails);
        } else {
          router.push("/users");
        }
      }
      setLoading(false); // Set loading to false when the fetch completes
    };

    fetchUserDetails();
  }, [id, router]);

  return (
    <Layout title="User | Edit">
      {loading ? (
        <UserFormSkeleton />
      ) : (
        <UserForm
          user={user}
          onSuccess={() => router.push(`/users/details/${user?._id}`)}
          onSave={(userData) => updateUser(user?._id, userData)}
        />
      )}
    </Layout>
  );
};

export default UserEditPage;
