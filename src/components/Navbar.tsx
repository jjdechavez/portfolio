import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import AccountDropdown from './AccountDropdown';

export default function Navbar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  return (
    <>
      <nav
        className="
          md:left-0 md:block md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64
          shadow-xl bg-white flex flex-wrap items-center justify-between relative z-10 py-4 px-6
        "
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Brand */}
          <div className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </div>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <AccountDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
