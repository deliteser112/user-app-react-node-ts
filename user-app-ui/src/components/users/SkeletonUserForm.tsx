// src/components/users/SkeletonUserForm.tsx
import React from "react";

const SkeletonUserForm: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 w-1/4 bg-gray-300 rounded mx-auto"></div>
    </div>
  );
};

export default SkeletonUserForm;
