// src/pages/users/add.tsx
import React from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import UserForm from "../../components/users/UserForm";
import { createUser } from "../../features/users/usersAPI";

const AddUserPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // Navigate to the users list page after successful creation
    router.push("/");
  };

  return (
    <Layout title="User | Add New User">
      <div>
        <h1 className="text-xl font-semibold mb-4">Add New User</h1>
        <UserForm
          user={{ _id: "", name: "", email: "", age: 0 }}
          onSuccess={handleSuccess}
          onSave={createUser}
        />
      </div>
    </Layout>
  );
};

export default AddUserPage;
