import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type CardProps = {
  title: string;
  length: number;
  percent: number;
  icon: {
    display: IconDefinition;
    color: string;
  };
  href: string;
};

export default function Card({
  title,
  length,
  percent,
  icon,
  href,
}: CardProps) {
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <Link href={href}>
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-gray-400 uppercase font-bold text-xs">
                  {title}
                </h5>
                <span className="font-semibold text-xl text-gray-700">
                  {length}
                </span>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div
                  className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-${icon.color}-500`}
                >
                  <FontAwesomeIcon icon={icon.display} />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              <span className="text-green-500 mr-2">
                <FontAwesomeIcon icon={faArrowUp} /> {percent}%
              </span>
              <span className="whitespace-nowrap">Since last month</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
