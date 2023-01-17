export type Schedule = {
  id: string;
  end: number;
  start: number;
  title: string;
};

export type ChannelSchedule = {
  id: string;
  title: string;
  schedules: Schedule[];
  images: {
    logo: string;
  };
};
