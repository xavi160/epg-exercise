import { Transition } from '@headlessui/react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type BroadcastItemProps = {
  className?: string;
  name: string;
  start: number;
  end: number;
  sizeRatio: number;
  defaultSelected?: boolean;
};

const BroadcastItem = React.forwardRef<HTMLDivElement, BroadcastItemProps>(
  ({ className, name, start, end, sizeRatio, defaultSelected }, ref) => {
    const now = Date.now();
    const isLive = start <= now && end >= now;

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const onMouseEnter = () => {
      setShowDetails(true);
    };
    const onMouseOut = () => {
      setShowDetails(false);
    };

    return (
      <div className="relative group h-22">
        <div
          ref={ref}
          className={twMerge(
            'border p-2 overflow-hidden overflow-ellipsis whitespace-nowrap bg-slate-50 dark:bg-slate-900 dark:border-slate-800 outline-0 transition-all duration-150 dark:text-slate-500 dark:hover:border-slate-400 hover:z-10 dark:hover:bg-slate-800 hover:bg-slate-100 dark:hover:text-slate-100 cursor-pointer select-none relative',
            isLive
              ? 'dark:bg-slate-800 bg-emerald-100 border-emerald-300 dark:border-gray-700'
              : '',
            className
          )}
          style={{ width: `${(end - start) * sizeRatio}rem` }}
          onMouseOver={onMouseEnter}
          onMouseOut={onMouseOut}
        >
          <h2>{name}</h2>

          <div className="dark:text-slate-600 text-slate-400 text-sm">
            {format(new Date(start), 'H:mm')}
          </div>
        </div>
        <Transition
          show={showDetails || defaultSelected || false}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="absolute border border-slate-300 dark:border-slate-700 dark:text-slate-100 z-30 bottom-16 dark:bg-slate-900 bg-slate-50 p-2 w-56 shadow-xl box-border">
            <div className="font-bold">{name}</div>
            <div className="text-slate-500">
              {format(new Date(start), 'H:mm')} -{' '}
              {format(new Date(end), 'H:mm')}
            </div>
          </div>
        </Transition>
      </div>
    );
  }
);

export default BroadcastItem;
