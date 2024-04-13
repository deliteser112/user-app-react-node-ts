import React from "react";
import Link from "next/link";
import Head from "next/head";

interface HeaderProps {
  title?: string;
}

const DEFAULT_TITLE = "User | Home";

const Header: React.FC<HeaderProps> = ({ title = DEFAULT_TITLE }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="navbar mx-auto max-w-7xl mt-4 px-4 shadow-xl rounded-box justify-between">
        <div className="navbar-start">
          <Link href="/" passHref>
            <span className="btn btn-ghost normal-case text-xl">HOME</span>
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/users/add" passHref>
            <span className="btn btn-ghost normal-case">+ Add User</span>
          </Link>
        </div>
      </nav>
    </header>
  </div>
);

export default Header;
