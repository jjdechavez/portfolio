import { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import fetchJson from '@/presentation/helpers/fetchJson';

export type HTMLButtonMouseEvent = MouseEvent<HTMLButtonElement>;

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
      <p>LoggedIn as {user.username}</p>
      <Link href={`/dashboard/posts`}>
        <a>Posts</a>
      </Link>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
}
