import { siteMeta } from '@/app/_const/site-meta';

// Destructure site meta data
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

// Interfaces for structured metadata types
interface ThemeColor {
  media: string; // Media query for the theme color
  color: string; // The actual color value
}
interface ImageObject {
  url: string;
  width: number;
  height: number;
}
interface Metadata {
  metadataBase: URL; // Base URL for metadata
  alternates: {
    canonical: string; // Canonical URL
  };
  title: {
    template: string; // Title template with placeholders
    default: string; // Default title
  };
  description: string; // Site description
}
interface ViewportMetadata {
  themeColor: ThemeColor[]; // Theme colors for light and dark modes
}
interface RobotsMetadata {
  index: boolean; // Should the page be indexed?
  follow: boolean; // Should the crawler follow links?
  nocache: boolean; // Should the page be cached?
}
interface OpenGraphMetadata {
  title: string; // OG title
  description: string; // OG description
  url: string; // OG URL
  siteName: string; // Site name for OG
  images: ImageObject[]; // OG images
  locale: string; // Locale for OG
  type: string; // Type of OG object
}
interface TwitterMetadata {
  card: string; // Type of Twitter card
  title: string; // Twitter title
  description: string; // Twitter description
  images: string[]; // Twitter images
}

// Base metadata configuration
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

// Theme color metadata for light and dark themes
export const viewportMetadata: ViewportMetadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteThemeColorLight },
    { media: '(prefers-color-scheme: dark)', color: siteThemeColorDark },
  ],
};

// Robots metadata configuration
export const robotsMetadata: RobotsMetadata = {
  index: siteRobotsIndex,
  follow: siteRobotsFollow,
  nocache: siteRobotsNocache,
};

// Open Graph metadata configuration
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

// Twitter metadata configuration
export const twitterMetadata: TwitterMetadata = {
  card: siteTwitterCard,
  title: siteTitle,
  description: siteDesc,
  images: [siteTwitterImage],
};
