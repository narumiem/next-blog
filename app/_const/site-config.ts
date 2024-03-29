import type { Eyecatch } from '@/app/_lib/microcms';

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
    light: 'skyblue',
    dark: 'orange',
  },
  siteRobots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export const eyecatchDefault: Eyecatch = {
  url: '/images/eyecatch-default.jpg',
  width: 1920,
  height: 1280,
  blurDataURL: '',
};
