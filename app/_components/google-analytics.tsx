// 'use client';
// import { useEffect } from 'react';
// import * as gtag from '@/app/_lib/gtag';
// import Script from 'next/script';
// import { usePathname, useSearchParams } from 'next/navigation';

// @next/third-parties へ切り替えたので未使用

// function GoogleAnalytics(): React.ReactElement {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const url = pathname + searchParams.toString();
//     gtag.pageview(url);
//   }, [pathname, searchParams]);

//   return (
//     <>
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
//       />
//       <Script
//         id="gtag-init"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${gtag.GA_MEASUREMENT_ID}');
//           `,
//         }}
//       />
//     </>
//   );
// }
// export default GoogleAnalytics;
