// src/components/users/UserItem.tsx
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface UserItemProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  onDelete: (userId: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
  const router = useRouter();

  return (
    <div
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
          className="p-2 text-blue-500 hover:text-blue-600 rounded-md hover:bg-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the row's onClick
            onDelete(user._id);
          }}
          className="p-2 text-red-500 hover:text-red-600 rounded-md hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
