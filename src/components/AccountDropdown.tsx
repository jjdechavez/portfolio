import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function AccountDropDown() {
  return (
    <>
      <a className="text-gray-500 block cursor-pointer">
        <div className="flex items-center">
          <span className="w-8 h-8 text-sm text-white bg-gray-200 inline-flex items-center justify-center rounded-full">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </a>
    </>
  );
}
