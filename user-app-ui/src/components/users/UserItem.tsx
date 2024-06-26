// src/components/users/UserItem.tsx

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserItemProps {
  user: User;
  onDelete: (userId: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
  const router = useRouter();

  const handleNavigateToDetails = (e) => {
    e.stopPropagation();
    router.push(`/users/details/${user._id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(user._id);
  };

  return (
    <div
      className="flex justify-between items-center py-4 px-6 shadow rounded-lg mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      onClick={handleNavigateToDetails}
    >
      <div className="flex-1">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div className="flex gap-2 align-item-center">
        <Link
          href={`/users/edit/${user._id}`}
          passHref
          className="p-2 text-blue-500 hover:text-blue-600 rounded-md hover:bg-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="p-2 text-red-500 hover:text-red-600 rounded-md hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
