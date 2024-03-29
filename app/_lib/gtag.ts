// import { siteConfig } from '@/app/_const/site-config';

// @next/third-parties へ切り替えたので未使用

// window.gtagの型エラーが出るときは以下で型定義をインストール
// npm install -D @types/gtag.js

// interface SiteConfig {
//   siteAnalyticsID: string;
// }
// export const { siteAnalyticsID }: SiteConfig = siteConfig;
// export const pageview = (url: string) => {
//   if (typeof window !== 'undefined') {
//     window.gtag('config', siteAnalyticsID, {
//       page_path: url,
//     });
//   }
// };
