import { siteMeta } from '@/app/_const/site-meta';

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
  siteRobotsFollow,
  siteRobotsNocache,
  siteOgpImage,
  siteOgpImageWidth,
  siteOgpImageHeight,
  siteTwitterCard,
  siteTwitterImage,
} = siteMeta;

interface ThemeColor {
  media: string;
  color: string;
}
interface ImageObject {
  url: string;
  width: number;
  height: number;
}
interface Metadata {
  metadataBase: URL;
  alternates: {
    canonical: string;
  };
  title: {
    template: string;
    default: string;
  };
  description: string;
}
interface ViewportMetadata {
  themeColor: ThemeColor[];
}
interface RobotsMetadata {
  index: boolean;
  follow: boolean;
  nocache: boolean;
}
interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: ImageObject[];
  locale: string;
  type: string;
}
interface TwitterMetadata {
  card: string;
  title: string;
  description: string;
  images: string[];
}

export const baseMetadata: Metadata = {
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

export const viewportMetadata: ViewportMetadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteThemeColorLight },
    { media: '(prefers-color-scheme: dark)', color: siteThemeColorDark },
  ],
};

export const robotsMetadata: RobotsMetadata = {
  index: siteRobotsIndex,
  follow: siteRobotsFollow,
  nocache: siteRobotsNocache,
};

export const openGraphMetadata: OpenGraphMetadata = {
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

export const twitterMetadata: TwitterMetadata = {
  card: siteTwitterCard,
  title: siteTitle,
  description: siteDesc,
  images: [siteTwitterImage],
};
