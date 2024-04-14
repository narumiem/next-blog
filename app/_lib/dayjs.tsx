import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { siteMetadata } from '@/app/_lib/metadata';

interface ConvertDateProps {
  dateISO: string; // Expecting date in ISO format
}
/**
 * ConvertDate component to convert and display a date in a specific timezone.
 * @param {string} dateISO - The date in ISO format.
 * @returns {React.ReactElement} - The converted date component.
 */
function ConvertDate({ dateISO }: ConvertDateProps): React.ReactElement {
  const { siteLang, siteTimezone, siteTimeFormat } = siteMetadata; // Destructure site metadata
  // Extend dayjs with necessary plugins
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // Set the locale based on site configuration
  dayjs.locale(siteLang);

  return (
    <time dateTime={dateISO}>
      {/* Convert the date to the specified timezone and format it */}
      {dayjs.utc(dateISO).tz(siteTimezone).format(siteTimeFormat)}
    </time>
  );
}

export default ConvertDate;
