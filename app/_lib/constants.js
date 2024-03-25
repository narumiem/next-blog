export const siteMeta = {
  siteTitle: 'CUBE',
  siteTitlePipe: '|',
  siteDesc: 'アウトプットしていくサイト',
  siteUrl: process.env.SITE_URL,
  siteLang: 'ja',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteThemeColorLight: 'skyblue', // ライトテーマの時のUIカラー (一部のブラウザ/端末のみ)
  siteThemeColorDark: 'orange', // ダークテーマの時のUIカラー (一部のブラウザ/端末のみ)
  siteRobotsIndex: false,
  siteRobotsfollow: true,
  siteRobotsNocache: true,
  siteOgpImage: process.env.SITE_URL + '/images/opengraph-image.jpg',
  siteOgpImageWidth: 1200,
  siteOgpImageHeight: 630,
  siteTwitterCard: 'summary_large_image',
  siteTwitterImage: process.env.SITE_URL + '/images/twitter-image.jpg',
};

export const eyecatchLocal = {
  url: '/images/eyecatch.jpg',
  width: 1920,
  height: 1280,
}
