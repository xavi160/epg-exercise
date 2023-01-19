import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ChannelSchedule } from '../types';
import ChannelRow from './ChannelRow';
import useInterval from '../hooks/useInterval';
import BroadcastItem from './BroadcastItem';

const MS_IN_HOUR = 3600000; // 60 * 60 * 1000
const DEFAULT_RATIO = 0.000004;
const RERENDER_INTERVAL_MS = 60000; // 5 * 60 * 1000 (1min)

type WebEPGProps = {
  channels: ChannelSchedule[];
  startTime: number;
  endTime: number;
};

const WebEPG: React.FC<WebEPGProps> = ({ channels, startTime, endTime }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sizeRatio, setSizeRatio] = useState(DEFAULT_RATIO);
  const now = Date.now();

  const scrollToNow = (behavior: 'smooth' | 'auto') => {
    if (ref.current) {
      ref.current.scrollTo({
        left: (now - startTime) * 16 * sizeRatio - ref.current.clientWidth / 6,
        behavior: behavior
      });
    }
  };

  const increaseRatio = () => {
    setSizeRatio((ratio) => ratio + DEFAULT_RATIO / 3);
  };
  const decreseRatio = () => {
    setSizeRatio((ratio) => Math.max(0, ratio - DEFAULT_RATIO / 3));
  };

  // Scroll to now after first render
  useEffect(() => {
    scrollToNow('auto');
  }, []);

  // Rerender the EPG every minute
  useInterval(RERENDER_INTERVAL_MS);

  return (
    <div className="relative dark:bg-slate-900 dark:text-slate-400 bg-slate-50 text-slate-700">
      <div className="flex justify-between px-8">
        <button
          className="text-2xl"
          onClick={() => {
            if (document.documentElement.className) {
              document.documentElement.className = '';
            } else {
              document.documentElement.className = 'dark';
            }
          }}
        >
          <span className="hidden dark:block">🌞</span>
          <span className="dark:hidden block">🌚</span>
        </button>
        <div>
          Zoom{' '}
          <button
            className="text-2xl p-2 dark:hover:text-slate-300 hover:text-slate-700"
            title="Increase"
            onClick={increaseRatio}
          >
            +
          </button>{' '}
          /{' '}
          <button
            className="text-2xl p-2 dark:hover:text-slate-300 hover:text-slate-700"
            title="Decrease"
            onClick={decreseRatio}
          >
            -
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex py-1 flex-col overflow-x-auto overflow-y-hidden hidden-scrollbar "
      >
        <div className="relative ml-16">
          <div
            className="w-4 inset-y-0 absolute h-screen z-20"
            style={{ left: (now - startTime) * 16 * sizeRatio }}
          >
            <div className="w-[3px] h-8 -mt-1 bg-emerald-500 dark:bg-yellow-300 rounded"></div>
            <div className="ml-[1px] w-[1px] h-full bg-emerald-500 dark:bg-yellow-300"></div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 z-20">
          <button
            className="rounded-xl bg-emerald-400 hover:bg-emerald-300 dark:bg-yellow-300 font-bold px-4 py-2 dark:hover:bg-yellow-200 text-black"
            onClick={() => scrollToNow('smooth')}
          >
            Now
          </button>
        </div>
        <div className="flex w-full ml-16 dark:text-slate-200 ">
          {new Array(24 /* Math.floor((endTime - startTime) / MS_IN_HOUR) */)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="shrink-0 border-slate-300 dark:border-slate-800 border-2 border-r-0 border-t-0 px-2 select-none"
                style={{ width: `${MS_IN_HOUR * sizeRatio}rem` }}
              >
                {format(new Date(index * MS_IN_HOUR + startTime), 'Haaa')}
              </div>
            ))}
        </div>
        {channels.map((channel) => (
          <ChannelRow
            key={channel.id}
            title={channel.title}
            image={channel.images.logo}
            schedules={channel.schedules}
            startTime={startTime}
            endTime={endTime}
            sizeRatio={sizeRatio}
          >
            {channel.schedules.map((schedule) => (
              <BroadcastItem
                key={schedule.start}
                name={schedule.title}
                start={schedule.start}
                end={schedule.end}
                sizeRatio={sizeRatio}
              />
            ))}
          </ChannelRow>
        ))}
      </div>
    </div>
  );
};

export default WebEPG;
