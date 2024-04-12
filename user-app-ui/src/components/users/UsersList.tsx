// src/components/users/UsersList.tsx

import React, { useEffect, useState } from "react";
import { User, fetchUsers, deleteUser } from "../../features/users/usersAPI";

import ConfirmDialog from "../common/ConfirmDialog";
import Pagination from "../common/Pagination";

import UserItem from "./UserItem";

const PAGE_PER_ITEMS = 5;

const UsersList: React.FC = () => {
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users, totalPages } = await fetchUsers(
          currentPage,
          PAGE_PER_ITEMS
        );
        setPaginatedUsers(users);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, [currentPage]);

  const openConfirmDialog = (userId: string) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(userIdToDelete);
        setPaginatedUsers(
          paginatedUsers.filter((user) => user._id !== userIdToDelete)
        );
        setIsConfirmOpen(false);
        setUserIdToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      {paginatedUsers.map((user) => (
        <UserItem key={user._id} user={user} onDelete={openConfirmDialog} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;
