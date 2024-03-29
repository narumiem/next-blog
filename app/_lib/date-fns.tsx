// import { parseISO, format } from 'date-fns';
// import { ja } from 'date-fns/locale/ja';

// VercelやNetlifyにDeploy時にTimezoneのせいで日付がズレる → Day.jsに切り替えて解決済み

// interface ConvertDateProps {
//   dateISO: string;
// }

// function ConvertDate({ dateISO }: ConvertDateProps): React.ReactElement {
//   return (
//     <time dateTime={dateISO}>
//       {format(parseISO(dateISO), 'yyyy年MM月dd日', { locale: ja })}
//     </time>
//   );
// }

// export default ConvertDate;
