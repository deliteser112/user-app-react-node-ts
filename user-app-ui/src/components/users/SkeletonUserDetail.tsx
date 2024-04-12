// src/components/users/SkeletonUserDetail.tsx
import React from "react";

const SkeletonUserDetail: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse space-y-4">
      <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonUserDetail;
