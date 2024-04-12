// src/components/users/UsersList.tsx

import React, { useEffect, useState } from "react";
import { User, fetchUsers, deleteUser } from "../../features/users/usersAPI";
import ConfirmDialog from "../common/ConfirmDialog";
import UserItem from "./UserItem";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

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

  const openConfirmDialog = (userId: string) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(userIdToDelete);
        setUsers(users.filter((user) => user._id !== userIdToDelete));
        setIsConfirmOpen(false);
        setUserIdToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="max-w-full mx-auto my-10">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message="Are you sure you want to delete this user?"
      />
      {users.map((user) => (
        <UserItem key={user._id} user={user} onDelete={openConfirmDialog} />
      ))}
    </div>
  );
};

export default UsersList;
