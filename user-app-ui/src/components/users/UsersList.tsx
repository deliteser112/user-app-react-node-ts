// src/components/users/UsersList.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User, fetchUsers, deleteUser } from "../../features/users/usersAPI";
import ConfirmDialog from "../common/ConfirmDialog";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const router = useRouter();

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
        setUsers(users.filter((user) => user._id !== userIdToDelete)); // Make sure you use the correct ID property
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
        <div
          key={user._id}
          className="flex justify-between items-center py-4 px-6 bg-white shadow rounded-lg mb-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => router.push(`/users/details/${user._id}`)}
        >
          <div className="flex-1">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/users/edit/${user._id}`}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the row's onClick
                openConfirmDialog(user._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
