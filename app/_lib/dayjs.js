import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default function ConvertDate({ dateISO }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <time dateTime={dateISO}>
      {dayjs
        .utc(dateISO)
        .tz(process.env.SITE_TIMEZONE, false)
        .format('YYYY年MM月DD日 Z')}
    </time>
  );
}
