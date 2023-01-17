import cx from 'classnames';
import {
  FocusHandler,
  useFocusable
} from '@noriginmedia/norigin-spatial-navigation';
import BroadcastItem, { BroadcastItemProps } from './BroadcastItem';
import { useEffect } from 'react';

type FocusableBroadcastItemProps = BroadcastItemProps & {
  onFocus: FocusHandler;
  focusOnRender?: boolean;
};

const FocusableBroadcastItem: React.FC<FocusableBroadcastItemProps> = ({
  onFocus,
  focusOnRender,
  ...props
}) => {
  const { ref, focused, focusSelf } = useFocusable({ onFocus });

  useEffect(() => {
    if (focusOnRender) {
      focusSelf();
    }
  }, [focusSelf]);

  return (
    <BroadcastItem
      {...props}
      className={cx({
        'dark:border-slate-400 z-10 dark:bg-slate-800 dark:text-slate-100':
          focused
      })}
      defaultSelected={focused}
      ref={ref}
    />
  );
};

export default FocusableBroadcastItem;
