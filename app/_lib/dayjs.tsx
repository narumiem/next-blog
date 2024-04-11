import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { siteConfig } from '@/app/_const/site-config';

interface ConvertDateProps {
  dateISO: string; // Expecting date in ISO format
}

// Component to convert and display date according to site's timezone and language
function ConvertDate({ dateISO }: ConvertDateProps): React.ReactElement {
  const { siteLang, siteTimezone, siteTimeFormat } = siteConfig; // Destructuring language, timezone and format from siteConfig

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale(siteLang); // Set locale for dayjs with site's language

  // Render time element with formatted date
  return (
    <time dateTime={dateISO}>{dayjs.utc(dateISO).tz(siteTimezone).format(siteTimeFormat)}</time>
  );
}

export default ConvertDate;
