import React, { SyntheticEvent } from 'react';
import useUser from '@/hooks/useUser';
import fetchJson from '@/presentation/helpers/fetchJson';
import Form from '@/components/Form';

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = React.useState('');

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setErrorMsg('');

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const body = {
      username: target.username.value,
      password: target.password.value,
    };

    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  }

  return (
    <div>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
