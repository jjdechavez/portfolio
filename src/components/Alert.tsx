import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export type AlertProps = {
  type: string;
  message: string;
};

export default function Alert({ type, message }: AlertProps) {
  const [close, setClose] = useState(false);

  let color = type === 'error' ? 'red' : 'green';

  return (
    <div
      className={`text-white px-6 py-4 border-0 rounded relative mb-4 bg-${color}-500 ${
        close && 'hidden'
      }`}
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
        <FontAwesomeIcon icon={faBell} />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">{type === 'error' ? 'error' : 'success'}:</b>{' '}
        {message}
      </span>
      <button
        onClick={() => setClose(true)}
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
      >
        <span>×</span>
      </button>
    </div>
  );
}
