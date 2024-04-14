import { siteConfig, siteOgp } from '@/app/_const/site-config';

/**
 * Creates the full image URL by combining the site URL and the given image path.
 * @param imagePath - The path of the image.
 * @returns The full image URL.
 */
const createFullImageUrl = (imagePath: string) =>
  `${siteConfig.url}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

// Generate the full URLs for the OGP image and Twitter image
const ogpImageUrl = createFullImageUrl(siteOgp.image);
const twitterImageUrl = createFullImageUrl(siteOgp.twitterImage);

/**
 * The site metadata object containing various site-related information.
 */
export const siteMetadata = {
  siteTitle: siteConfig.title, // The title of the site
  siteTitlePipe: siteConfig.titlePipe, // The piped title of the site
  siteDesc: siteConfig.description, // The description of the site
  siteUrl: siteConfig.url, // The URL of the site
  siteEmail: siteConfig.email, // The email address of the site
  siteLang: siteConfig.lang, // The language of the site
  siteLocale: siteConfig.locale, // The locale of the site
  siteType: siteConfig.type, // The type of the site
  siteTimezone: siteConfig.timezone, // The timezone of the site
  siteTimeFormat: siteConfig.timeFormat, // The time format of the site
  siteGoogleAnalyticsID: siteConfig.googleAnalyticsID, // The Google Analytics ID of the site
  siteThemeColorLight: siteConfig.themeColor.light, // The light theme color of the site
  siteThemeColorDark: siteConfig.themeColor.dark, // The dark theme color of the site
  siteRobotsIndex: siteConfig.robots.index, // The index setting for robots
  siteRobotsFollow: siteConfig.robots.follow, // The follow setting for robots
  siteRobotsNocache: siteConfig.robots.nocache, // The nocache setting for robots
  siteOgpImage: ogpImageUrl, // The URL of the OGP image
  siteOgpImageWidth: siteOgp.width, // The width of the OGP image
  siteOgpImageHeight: siteOgp.height, // The height of the OGP image
  siteTwitterCard: siteOgp.twitterCard, // The Twitter card type
  siteTwitterImage: twitterImageUrl, // The URL of the Twitter image
};

// Destructure the site metadata
const {
  siteTitle, // The title of the site
  siteTitlePipe, // A pipe character used in the title template
  siteDesc, // The description of the site
  siteUrl, // The URL of the site
  siteLocale, // The locale of the site
  siteType, // The type of the site
  siteThemeColorLight, // The theme color for light mode
  siteThemeColorDark, // The theme color for dark mode
  siteRobotsIndex, // Whether search engines should index the site
  siteRobotsFollow, // Whether search engines should follow links on the site
  siteRobotsNocache, // Whether search engines should cache the site
  siteOgpImage, // The URL of the Open Graph Protocol image
  siteOgpImageWidth, // The width of the Open Graph Protocol image
  siteOgpImageHeight, // The height of the Open Graph Protocol image
  siteTwitterCard, // The type of Twitter card to use
  siteTwitterImage, // The URL of the Twitter card image
} = siteMetadata;

/**
 * The base metadata for the site.
 */
export const baseMetadata = {
  metadataBase: new URL(siteUrl), // The base URL for metadata
  alternates: {
    canonical: '/', // The canonical URL for the site
  },
  title: {
    template: `%s ${siteTitlePipe} ${siteTitle}`, // The template for the title
    default: siteTitle, // The default title
  },
  description: siteDesc, // The description of the site
};

/**
 * The viewport metadata for the site.
 */
export const viewportMetadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteThemeColorLight }, // Theme color for light mode
    { media: '(prefers-color-scheme: dark)', color: siteThemeColorDark }, // Theme color for dark mode
  ],
};

/**
 * The robots metadata for the site.
 */
export const robotsMetadata = {
  index: siteRobotsIndex, // Whether search engines should index the site
  follow: siteRobotsFollow, // Whether search engines should follow links on the site
  nocache: siteRobotsNocache, // Whether search engines should cache the site
};

/**
 * The Open Graph metadata for the site.
 */
export const openGraphMetadata = {
  title: siteTitle, // The title for Open Graph
  description: siteDesc, // The description for Open Graph
  url: siteUrl, // The URL for Open Graph
  siteName: siteTitle, // The site name for Open Graph
  images: [
    {
      url: siteOgpImage, // The URL of the Open Graph image
      width: siteOgpImageWidth, // The width of the Open Graph image
      height: siteOgpImageHeight, // The height of the Open Graph image
    },
  ],
  locale: siteLocale, // The locale for Open Graph
  type: siteType, // The type for Open Graph
};

/**
 * The Twitter metadata for the site.
 */
export const twitterMetadata = {
  card: siteTwitterCard, // The type of Twitter card to use
  title: siteTitle, // The title for Twitter
  description: siteDesc, // The description for Twitter
  images: [siteTwitterImage], // The images for Twitter
};
