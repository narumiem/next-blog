import '@/app/_styles/globals.css';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import '@/app/_lib/fa-config';
import { siteMeta } from '@/app/_lib/constants';
import {
  baseMetadata,
  robotsMetadata,
  openGraphMetadata,
  twitterMetadata,
  viewportMetadata,
} from '@/app/_lib/baseMetadata';
import { GoogleAnalytics } from '@next/third-parties/google';
import siteConfig from '@/app/_const/siteConfig';

const { siteLang } = siteMeta;

export const metadata = {
  ...baseMetadata,
  robots: { ...robotsMetadata },
  openGraph: { ...openGraphMetadata },
  twitter: { ...twitterMetadata },
};

export const viewport = { ...viewportMetadata };

export default function RootLayout({ children }) {
  return (
    <html lang={siteLang}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId={siteConfig.siteAnalyticsID} />
        )}
      </body>
    </html>
  );
}
