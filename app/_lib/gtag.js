import siteConfig from '@/app/_const/siteConfig';

// @next/third-parties へ切り替えたので未使用
export const GA_MEASUREMENT_ID = siteConfig.siteAnalyticsID;
export const pageview = (url) => {
  !window && (window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  }))
}