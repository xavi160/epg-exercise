import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Schedule } from '../types';

type GetEPGAPIResponse = {
  channels: {
    id: string;
    title: string;
    images: { logo: string };
    schedules: Schedule[];
  }[];
};

export default () =>
  useQuery(['EPG'], async () => {
    const response = await axios.get<GetEPGAPIResponse>(
      import.meta.env.VITE_MOCK_API_URL
    );

    const channels = response.data?.channels?.map((channel) => ({
      ...channel,
      schedules: channel.schedules.map((schedule) => ({
        ...schedule,
        start: new Date(schedule.start).getTime(),
        end: new Date(schedule.end).getTime()
      }))
    }));

    const startTimestamp = Math.min(
      ...channels.map((channel) => channel.schedules[0].start)
    );

    const endTimestamp = Math.max(
      ...channels.map(
        (channel) => channel.schedules[channel.schedules.length - 1].end
      )
    );

    return { channels, startTimestamp, endTimestamp };
  });
