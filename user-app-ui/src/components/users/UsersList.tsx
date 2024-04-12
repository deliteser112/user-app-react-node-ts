import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../../features/users/usersAPI";

import ConfirmDialog from "../common/ConfirmDialog";
import Pagination from "../common/Pagination";
import NoData from "../common/NoData";

import UserItem from "./UserItem";
import SkeletonUserItem from "./SkeletonUserItem";

import { useUsers } from "../../hooks/useUsers";

import { User } from "../../types/user";

const UsersList: React.FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  // Fetch users with pagination
  const { data, isLoading, isError } = useUsers(currentPage);

  // Mutation for deleting a user
  const deleteMutation = useMutation((userId: string) => deleteUser(userId), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users", currentPage]);
      closeConfirmDialog();
    },
  });

  const openConfirmDialog = (userId: string) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmOpen(false);
    setUserIdToDelete(null);
  };

  const handleDelete = () => {
    if (userIdToDelete) {
      deleteMutation.mutate(userIdToDelete);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <SkeletonUserItem />;
  if (isError) return <div>An error occurred</div>;

  return (
    <div className="max-w-full mx-auto my-10">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message="Are you sure you want to delete this user?"
      />
      {data?.users.length > 0 ? (
        <>
          {data?.users.map((user: User) => (
            <UserItem key={user._id} user={user} onDelete={openConfirmDialog} />
          ))}
        </>
      ) : (
        <NoData />
      )}

      {data?.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UsersList;
