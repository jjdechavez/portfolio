import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTv,
  faNewspaper,
  faTimes,
  faClipboardList,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import AccountDropdown from './AccountDropdown';
import useLogout from '@/hooks/useLogout';

export default function SideBar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const [{ logout }] = useLogout();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
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
            <Link href="/">
              <a>User Profile</a>
            </Link>
          </div>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <AccountDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <div className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    <Link href="/dashboard">
                      <a>User Profile</a>
                    </Link>
                  </div>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <div className="text-blue-500 hover:text-blue-600 text-xs uppercase py-3 font-bold block">
                  <Link href="/dashboard">
                    <a>
                      <FontAwesomeIcon icon={faTv} /> Dashboard
                    </a>
                  </Link>
                </div>
              </li>
              <li className="items-center">
                <div className="text-gray-700 hover:text-gray-500 text-xs uppercase py-3 font-bold block">
                  <Link href="/dashboard/projects">
                    <a>
                      <FontAwesomeIcon icon={faNewspaper} /> Projects
                    </a>
                  </Link>
                </div>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-300 text-xs uppercase py-3 font-bold block"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Journey (soon)
                </a>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Settings
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <div className="cursor-pointer text-gray-700 hover:text-gray-500 text-sm block mb-4 no-underline font-semibold">
                  <a onClick={(e) => logout(e)}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
