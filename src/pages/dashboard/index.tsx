import { MouseEvent } from 'react';
import useUser from '@/hooks/useUser';
import Table, { SmallTable, TableWrapper } from '@/components/dashboard/Table';
import Admin from '@/layouts/Admin';

export type HTMLElementMouseEvent = MouseEvent<any>;

export default function Dashboard() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:px-10 md:grid md:grid-cols-3 md:gap-4">
        <TableWrapper>
          <Table />
          <SmallTable />
        </TableWrapper>
      </div>
    </div>
  );
}

Dashboard.layout = Admin;
