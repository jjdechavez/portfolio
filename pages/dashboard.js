import { useRouter } from 'next/router';
import useUser from 'lib/useUser';
import fetchJson from 'lib/fetchJson';

export default function Dashboard() {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <p>LoggedIn as {user.username}</p>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
}
