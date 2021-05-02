import { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import fetchJson from '@/presentation/helpers/fetchJson';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChartBar } from '@fortawesome/free-solid-svg-icons';

export type HTMLButtonMouseEvent = MouseEvent<HTMLButtonElement>;

function Cards() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-gray-400 uppercase font-bold text-xs">
                  Traffic
                </h5>
                <span className="font-semibold text-xl text-blueGray-700">
                  350,897
                </span>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <i className="far fa-chart-bar"></i>
                  <FontAwesomeIcon icon={faChartBar} />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              <span className="text-green-500 mr-2">
                <FontAwesomeIcon icon={faArrowUp} /> 3.48%
              </span>
              <span className="whitespace-nowrap">Since last month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  const handleLogout = async (e: HTMLButtonMouseEvent) => {
    e.preventDefault();
    mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100">
        <Navbar />
        <div className="relative bg-gray-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <Cards />
            </div>
          </div>
        </div>
      </div>
      <Link href={`/dashboard/posts`}>
        <a>Posts</a>
      </Link>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
}
