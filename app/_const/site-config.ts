import { Eyecatch } from '@/app/_lib/apollo-client';

interface SiteConfig {
  siteUrl: string;
  siteTitle: string;
  siteTitlePipe: string;
  siteDescription: string;
  siteEmail: string;
  siteSocial: {
    twitter: string;
    facebook: string;
    github: string;
  };
  siteLang: string;
  siteLocale: string;
  siteType: string;
  siteTimezone: string;
  siteAnalyticsID: string;
  siteThemeColor: {
    light: string;
    dark: string;
  };
  siteRobots: {
    index: boolean;
    follow: boolean;
    nocache: boolean;
  };
}

export const siteConfig: SiteConfig = {
  siteTitle: 'Next Blog',
  siteTitlePipe: '|',
  siteDescription: 'Next.js で構築する Blog Portfolio',
  siteUrl: 'https://portfolio-next-blog.narumiem.org',
  siteEmail: 'narumiem@gmail.com',
  siteSocial: {
    twitter: '',
    facebook: '',
    github: 'narumiem',
  },
  siteLang: 'ja',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteTimezone: 'Asia/Tokyo',
  siteAnalyticsID: 'G-EDFYLLGESB',
  siteThemeColor: {
    light: '#a8b98a', // --color-theme-lightgreen
    dark: '#4a3f28', // --color-theme-darkbrown
  },
  siteRobots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export const versatileBlurData: string =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAukB9LFu0T8AAAAASUVORK5CYII=';

export const eyecatchDefault: Eyecatch = {
  id: 'default',
  mediaItemUrl: '/images/eyecatch-default.webp',
  altText: 'テーブルに置かれたラップトップPCとコーヒーと観葉植物',
  mediaDetails: {
    width: 1024,
    height: 1024,
  },
  blurDataURL: versatileBlurData,
};

export const eyecatch404: Eyecatch = {
  id: '404error',
  mediaItemUrl: '/images/404.webp',
  altText: '404と書かれたラップトップPCと黒いライトスタンドの置かれたテーブル',
  mediaDetails: {
    width: 1024,
    height: 1024,
  },
  blurDataURL: versatileBlurData,
};

export const blogPath: string = 'blog';