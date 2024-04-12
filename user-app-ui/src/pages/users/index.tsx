// src/pages/users/index.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../../components/layout/Layout";
import { User, fetchUsers } from "../../features/users/usersAPI";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <Layout title="User | List">
      <div>
        <h1 className="text-xl font-bold mb-4">Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <Link
                href={`/users/details/${user._id}`}
                className="text-blue-500 hover:underline"
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default UsersPage;
