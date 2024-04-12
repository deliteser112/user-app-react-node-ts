// src/components/users/SkeletonUserItem.tsx
import React from "react";

const SkeletonUserItem: React.FC = () => {
  return (
    <div className="max-w-full mx-auto my-10 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="animate-pulse space-y-4" key={index}>
          <div className="h-20 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonUserItem;
