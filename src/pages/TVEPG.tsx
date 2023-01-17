import { init } from '@noriginmedia/norigin-spatial-navigation';
import React, { useEffect } from 'react';
import TVEPG from '../components/TVEPG';
import useEPG from '../hooks/useEPG';

type TVEPGPageProps = {};

init();

const TVEPGPage: React.FC<TVEPGPageProps> = () => {
  const { data, isLoading, error } = useEPG();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>Empty</div>;
  }
  const { channels, startTimestamp, endTimestamp } = data;

  return (
    <TVEPG
      channels={channels}
      startTime={startTimestamp}
      endTime={endTimestamp}
    />
  );
};

export default TVEPGPage;
