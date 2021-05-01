import React, { SyntheticEvent } from 'react';
import useUser from '@/hooks/useUser';
import fetchJson from '@/presentation/helpers/fetchJson';
import Alert from '@/components/Alert';

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      setError(error.data.message);
    } finally {
      setLoading(false);
    }
  }

  let isDisabled = loading;

  return (
    <div className="container h-screen mx-auto px-4">
      <div className="w-full h-full flex flex-col justify-center items-center max-w-sm mx-auto my-auto">
        {error && <Alert type="error" message={error} />}
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-600"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-2 focus:ring-blue-600"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              disabled={isDisabled}
              className={`block flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow ${
                isDisabled && 'disabled:opacity-50 cursor-not-allowed'
              }`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
