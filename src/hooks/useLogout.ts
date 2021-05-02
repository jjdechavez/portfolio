import React from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import fetchJson from '@/presentation/helpers/fetchJson';
import { HTMLElementMouseEvent } from '@/pages/dashboard';

export default function useLogout() {
  const { mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  const handlers = React.useMemo(
    () => ({
      logout: async (e: HTMLElementMouseEvent) => {
        e.preventDefault();

        mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
        router.push('/login');
      },
    }),
    []
  );

  return [handlers];
}
