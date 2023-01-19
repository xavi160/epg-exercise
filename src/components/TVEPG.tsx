import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ChannelSchedule } from '../types';
import ChannelRow from './ChannelRow';
import useInterval from '../hooks/useInterval';
import FocusableBroadcastItem from './FocusableBroadcastItem';
import {
  FocusContext,
  FocusHandler,
  useFocusable
} from '@noriginmedia/norigin-spatial-navigation';

const MS_IN_HOUR = 3600000; // 60 * 60 * 1000
const DEFAULT_RATIO = 0.000008;
const RERENDER_INTERVAL_MS = 300000; // 5 * 60 * 1000 (5min)

type TVEPGProps = {
  channels: ChannelSchedule[];
  startTime: number;
  endTime: number;
};

const TVEPG: React.FC<TVEPGProps> = ({ channels, startTime, endTime }) => {
  const now = Date.now();

  const { ref, focusKey } = useFocusable();

  const onFocus: FocusHandler = (event) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: Math.max(0, event.left - 500),
        behavior: 'smooth'
      });
    }
  };

  // Rerender the EPG every 5 minutes
  useInterval(RERENDER_INTERVAL_MS);

  return (
    <div className="relative bg-slate-900 text-slate-400">
      <FocusContext.Provider value={focusKey}>
        <div
          ref={ref}
          className="flex py-1 flex-col overflow-x-auto overflow-y-hidden hidden-scrollbar "
        >
          <div className="relative ml-16">
            <div
              className="w-4 inset-y-0 absolute h-screen z-20"
              style={{ left: (now - startTime) * 16 * DEFAULT_RATIO }}
            >
              <div className="w-[3px] h-8 -mt-1 bg-yellow-300 rounded"></div>
              <div className="ml-[1px] w-[1px] h-full bg-yellow-300"></div>
            </div>
          </div>
          <div className="flex w-full ml-16 text-slate-200 ">
            {new Array(24 /* Math.floor((endTime - startTime) / MS_IN_HOUR) */)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="shrink-0 border-slate-800 border-2 border-r-0 border-t-0 px-2 select-none"
                  style={{ width: `${MS_IN_HOUR * DEFAULT_RATIO}rem` }}
                >
                  {format(new Date(index * MS_IN_HOUR + startTime), 'Haaa')}
                </div>
              ))}
          </div>
          {channels.map((channel, index) => (
            <ChannelRow
              key={channel.id}
              title={channel.title}
              image={channel.images.logo}
              schedules={channel.schedules}
              startTime={startTime}
              endTime={endTime}
              sizeRatio={DEFAULT_RATIO}
            >
              {channel.schedules.map((schedule) => {
                const now = Date.now();
                const isLive = schedule.start <= now && schedule.end >= now;
                return (
                  <FocusableBroadcastItem
                    key={schedule.start}
                    name={schedule.title}
                    start={schedule.start}
                    end={schedule.end}
                    sizeRatio={DEFAULT_RATIO}
                    onFocus={onFocus}
                    focusOnRender={index === 0 && isLive}
                  />
                );
              })}
            </ChannelRow>
          ))}
        </div>
      </FocusContext.Provider>
    </div>
  );
};

export default TVEPG;
