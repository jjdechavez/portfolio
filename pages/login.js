import React from 'react';
import useUser from '../lib/useUser';
import fetchJson from 'lib/fetchJson';
import Form from 'components/Form';

export default function Login() {
  const { user, mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    if (user) console.log('new user', user);
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
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
