import { MouseEvent } from 'react';
import useUser from '@/hooks/useUser';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Table, { SmallTable, TableWrapper } from '@/components/dashboard/Table';
import { faChartBar, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

export type HTMLElementMouseEvent = MouseEvent<any>;

export default function Dashboard() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100">
        <Navbar />
        <div className="relative bg-gray-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="flex flex-wrap">
                <Card
                  title="Projects"
                  length={25}
                  percent={30}
                  icon={{ display: faChartBar, color: 'red' }}
                  href="/dashboard/projects"
                />
                <Card
                  title="Journey"
                  length={25}
                  percent={30}
                  icon={{ display: faHourglassHalf, color: 'purple' }}
                  href="/dashboard/journey"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <TableWrapper>
            <Table />
            <SmallTable />
          </TableWrapper>
        </div>
      </div>
    </div>
  );
}
