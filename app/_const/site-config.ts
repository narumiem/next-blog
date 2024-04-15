import type { Eyecatch } from '@/app/_lib/apollo-client';

// Interface for the site configuration
interface SiteConfig {
  url: string; // The URL of the site
  title: string; // The title of the site
  titlePipe: string; // The pipe character used in the site title
  description: string; // The description of the site
  email: string; // The email address associated with the site
  lang: string; // The language code of the site
  locale: string; // The locale code of the site
  type: string; // The type of the site
  timezone: string; // The timezone of the site
  timeFormat: string; // The format of the site's time display
  googleAnalyticsID: string; // The ID of the site's analytics
  themeColor: {
    // The theme colors of the site
    light: string; // The light theme color
    dark: string; // The dark theme color
  };
  robots: {
    // The robots meta settings of the site
    index: boolean; // Whether the site should be indexed by search engines
    follow: boolean; // Whether search engines should follow links on the site
    nocache: boolean; // Whether search engines should cache the site's content
  };
}

// Interface for the site's Open Graph Protocol (OGP) settings
interface SiteOgp {
  image: string; // The URL of the OGP image
  width: number; // The width of the OGP image
  height: number; // The height of the OGP image
  twitterCard: string; // The type of Twitter card to use
  twitterImage: string; // The URL of the Twitter image
}

// Interface for the site's social media links
interface SiteSocial {
  twitter: string; // The Twitter user ID
  facebook: string; // The Facebook user ID
  github: string; // The GitHub user ID
}

// Interface for the site's logo
interface SiteLogo {
  image: string; // The URL of the logo image
  width: number; // The width of the logo image
  height: number; // The height of the logo image
  alt: string; // The alt text of the logo image
  blurDataURL: string; // The base64-encoded blur data URL of the logo image
}

// The site configuration
export const siteConfig: SiteConfig = {
  title: 'Next Blog', // The title of the site
  titlePipe: '|', // The pipe character used in the site title
  description: 'Next.js と ヘッドレスWordPress で構築する Blog', // The description of the site
  url: 'https://next-blog.narumiem.org', // The URL of the site
  email: 'narumiem@gmail.com', // The email address associated with the site
  lang: 'ja', // The language code of the site
  locale: 'ja_JP', // The locale code of the site
  type: 'website', // The type of the site
  timezone: 'Asia/Tokyo', // The timezone of the site
  timeFormat: 'YYYY年MM月DD日 HH:mm:ss', // The format of the site's time display
  googleAnalyticsID: 'G-L9Z09V0L3C', // The ID of the site's analytics
  themeColor: {
    light: '#a8b98a', // The light theme color
    dark: '#4a3f28', // The dark theme color
  },
  robots: {
    index: false, // Do not index the site
    follow: true, // Follow links on the site
    nocache: true, // Do not cache the site's content
  },
};

// The site's OGP settings
export const siteOgp: SiteOgp = {
  image: '/images/ogp-image.webp', // The URL of the OGP image
  width: 1200, // The width of the OGP image
  height: 630, // The height of the OGP image
  twitterCard: 'summary_large_image', // The type of Twitter card to use
  twitterImage: '/images/twitter-image.webp', // The URL of the Twitter image
};

// The site's social media links
export const siteSocial: SiteSocial = {
  twitter: '', // The Twitter user ID
  facebook: '', // The Facebook user ID
  github: 'narumiem', // The GitHub user ID
};

// The base64-encoded blur data URL used for image placeholders
export const versatileBlurData: string =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAukB9LFu0T8AAAAASUVORK5CYII=';

// The site's logo
export const siteLogo: SiteLogo = {
  image: '/images/site-logo.webp', // The URL of the logo image
  width: 720, // The width of the logo image
  height: 640, // The height of the logo image
  alt: siteConfig.title, // The alt text of the logo image
  blurDataURL: versatileBlurData, // The base64-encoded blur data URL of the logo image
};

// The default eyecatch settings
export const eyecatchDefault: Eyecatch = {
  id: 'default', // The ID of the eyecatch
  mediaItemUrl: '/images/eyecatch-default.webp', // The URL of the eyecatch image
  altText: 'テーブルに置かれたラップトップPCとコーヒーと観葉植物', // The alt text of the eyecatch image
  mediaDetails: {
    width: 1024, // The width of the eyecatch image
    height: 1024, // The height of the eyecatch image
  },
  blurDataURL: versatileBlurData, // The base64-encoded blur data URL of the eyecatch image
};

// The 404 eyecatch settings
export const eyecatch404: Eyecatch = {
  id: '404error', // The ID of the eyecatch
  mediaItemUrl: '/images/404.webp', // The URL of the eyecatch image
  altText: '404と書かれたラップトップPCと黒いライトスタンドの置かれたテーブル', // The alt text of the eyecatch image
  mediaDetails: {
    width: 1024, // The width of the eyecatch image
    height: 1024, // The height of the eyecatch image
  },
  blurDataURL: versatileBlurData, // The base64-encoded blur data URL of the eyecatch image
};

// The path for the blog
export const BLOG_PATH: string = 'blog';

// The public directory
export const PUBLIC_DIR: string = './public';
