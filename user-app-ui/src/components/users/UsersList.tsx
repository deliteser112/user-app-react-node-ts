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

const useDeleteUser = (currentPage: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, error } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", currentPage]);
    },
  });

  return { delete: mutateAsync, isError, error };
};

const UsersList: React.FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useUsers(currentPage);
  const { delete: deleteMutation, isError: isDeleteError } =
    useDeleteUser(currentPage);

  const openConfirmDialog = (userId: string) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (userIdToDelete) {
      await deleteMutation(userIdToDelete);
      setIsConfirmOpen(false);
      setUserIdToDelete(null);
    }
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) return <SkeletonUserItem />;
  if (isError || isDeleteError) {
    return <div>An error occurred: Failed to load users.</div>;
  }

  if (!data?.users.length) return <NoData />;

  return (
    <div className="max-w-full mx-auto my-10">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message="Are you sure you want to delete this user?"
      />
      {data.users.map((user: User) => (
        <UserItem key={user._id} user={user} onDelete={openConfirmDialog} />
      ))}
      {data.totalPages > 1 && (
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
