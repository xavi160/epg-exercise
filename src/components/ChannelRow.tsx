import { Schedule } from '../types';
import Image from './Image';

type ChannelRowProps = {
  title: string;
  image: string;
  schedules: Schedule[];
  startTime: number;
  endTime: number;
  sizeRatio: number;
  children: React.ReactNode;
};

const ChannelRow: React.FC<ChannelRowProps> = ({
  title,
  image,
  schedules,
  startTime,
  endTime,
  sizeRatio,
  children
}) => (
  <div className="flex gap-0.5 w-full h-22">
    <div
      className="font-bold dark:bg-slate-800 bg-slate-200 border-slate-300 dark:border-slate-700 border py-5 left-0 w-16 dark:text-slate-200 z-30 absolute select-none flex justify-center"
      title={title}
    >
      <Image src={image} title={title} className="w-6 h-6" fallback="📺" />
    </div>
    <div
      className="flex ml-16 dark:bg-slate-900 bg-slate-400 bg-stripes"
      style={{
        paddingLeft: `${(schedules[0].start - startTime) * sizeRatio}rem`,
        paddingRight: `${
          (endTime - schedules[schedules.length - 1].end) * sizeRatio
        }rem`
      }}
    >
      {children}
    </div>
  </div>
);

export default ChannelRow;
