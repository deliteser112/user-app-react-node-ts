import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Header title={title} />
      <main className="max-w-[1200px] mx-auto my-10">{children}</main>
    </div>
  );
};

export default Layout;
