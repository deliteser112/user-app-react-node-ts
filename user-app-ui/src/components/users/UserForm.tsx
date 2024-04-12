// src/components/users/UserForm.tsx
import React, { useState } from "react";
import { User } from "../../features/users/usersAPI"; // Adjust import paths as needed

interface UserFormProps {
  user?: User; // If user is provided, the form is in edit mode.
  onSuccess: () => void; // Callback function to invoke on successful add/edit.
  onSave: (userData: Partial<User>) => {}; // Ensure onSave is correctly typed
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age.toString() || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, email, age: Number(age) };

    try {
      if (onSave) {
        await onSave(userData);
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-5 shadow-lg rounded-lg bg-white"
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Type your name..."
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Type your email..."
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          placeholder="Type your age..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {user._id ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
