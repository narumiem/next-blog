import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import siteConfig from '@/app/_const/siteConfig';

export default function ConvertDate({ dateISO }) {
  const locale = 'ja';
  const timezone = siteConfig.siteTimezone;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale(locale);

  return (
    <time dateTime={dateISO}>
      {dayjs.utc(dateISO).tz(timezone).format('YYYY年MM月DD日')}
    </time>
  );
}
