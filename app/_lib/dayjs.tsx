import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { siteConfig } from '@/app/_const/site-config';

interface ConvertDateProps {
  dateISO: string;
}

function ConvertDate({ dateISO }: ConvertDateProps): React.ReactElement {
  const siteLocale = 'ja';
  const { siteTimezone } = siteConfig;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale(siteLocale);

  return (
    <time dateTime={dateISO}>{dayjs.utc(dateISO).tz(siteTimezone).format('YYYY年MM月DD日')}</time>
  );
}

export default ConvertDate;
