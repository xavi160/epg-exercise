import React from 'react';
import WebEPG from '../components/WebEPG';
import useEPG from '../hooks/useEPG';

type WebEPGPageProps = {};

const WebEPGPage: React.FC<WebEPGPageProps> = () => {
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
    <WebEPG
      channels={channels}
      startTime={startTimestamp}
      endTime={endTimestamp}
    />
  );
};

export default WebEPGPage;
