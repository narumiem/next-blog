import siteConfig from '@/app/_const/siteConfig';

export const siteMeta = {
  siteTitle: siteConfig.siteName,
  siteTitlePipe: '|',
  siteDesc: siteConfig.siteDescription,
  siteUrl: siteConfig.siteUrl,
  siteLang: siteConfig.siteLang,
  siteLocale: siteConfig.siteLocale,
  siteType: siteConfig.siteType,
  siteThemeColorLight: siteConfig.siteThemeColor.light, // ライトテーマの時のUIカラー (一部のブラウザ/端末のみ)
  siteThemeColorDark: siteConfig.siteThemeColor.dark, // ダークテーマの時のUIカラー (一部のブラウザ/端末のみ)
  siteRobotsIndex: siteConfig.siteRobot.index,
  siteRobotsfollow: siteConfig.siteRobot.follow,
  siteRobotsNocache: siteConfig.siteRobot.nocache,
  siteOgpImage: siteConfig.siteUrl + '/images/opengraph-image.jpg',
  siteOgpImageWidth: 1200,
  siteOgpImageHeight: 630,
  siteTwitterCard: 'summary_large_image',
  siteTwitterImage: siteConfig.siteUrl + '/images/twitter-image.jpg',
};

export const eyecatchLocal = {
  url: '/images/eyecatch.jpg',
  width: 1920,
  height: 1280,
}
