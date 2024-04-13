// src/components/users/UserForm.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import { User } from '../../types/user';

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
  onSave: (userData: Partial<User>) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age.toString() || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, age: Number(age) };

    setIsLoading(true);

    try {
      await onSave(userData);
      onSuccess();
    } catch (error: any) {
      if (error.isError && error.data && error.data.errors) {
        const validationErrors = error.data.errors.reduce(
          (
            acc: { [key: string]: string },
            currentError: { path: string; msg: string }
          ) => {
            acc[currentError.path] = currentError.msg;
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
      } else {
        console.error("Failed to save user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-5 shadow-lg rounded-lg"
    >
      <InputField
        label="Name *"
        type="text"
        id="name"
        placeholder="Type your name..."
        value={name}
        errorMessage={errors.name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Email *"
        type="email"
        id="email"
        placeholder="Type your email..."
        value={email}
        errorMessage={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Age"
        type="number"
        id="age"
        placeholder="Type your age..."
        value={age}
        errorMessage={errors.age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : user?.name ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;