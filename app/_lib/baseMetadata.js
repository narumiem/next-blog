import { siteMeta } from '@/app/_lib/constants';

const {
  siteTitle,
  siteTitlePipe,
  siteDesc,
  siteUrl,
  siteLocale,
  siteType,
  siteThemeColorLight,
  siteThemeColorDark,
  siteRobotsIndex,
  siteRobotsfollow,
  siteRobotsNocache,
  siteOgpImage,
  siteOgpImageWidth,
  siteOgpImageHeight,
  siteTwitterCard,
  siteTwitterImage,
} = siteMeta;

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title: {
    template: `%s ${siteTitlePipe} ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDesc,
};

export const viewportMetadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteThemeColorLight },
    { media: '(prefers-color-scheme: dark)', color: siteThemeColorDark },
  ],
};

export const robotsMetadata = {
  index: siteRobotsIndex,
  follow: siteRobotsfollow,
  nocache: siteRobotsNocache,
};

export const openGraphMetadata = {
  title: siteTitle,
  description: siteDesc,
  url: siteUrl,
  siteName: siteTitle,
  images: [
    {
      url: siteOgpImage,
      width: siteOgpImageWidth,
      height: siteOgpImageHeight,
    },
  ],
  locale: siteLocale,
  type: siteType,
};

export const twitterMetadata = {
  card: siteTwitterCard,
  title: siteTitle,
  description: siteDesc,
  images: [siteTwitterImage],
};
