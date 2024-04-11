import '@/app/_styles/globals.css';
import '@/app/_const/font-awesome';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import { siteMeta } from '@/app/_const/site-meta';
import {
  baseMetadata,
  robotsMetadata,
  openGraphMetadata,
  twitterMetadata,
  viewportMetadata,
} from '@/app/_lib/base-metadata';
import { GoogleAnalytics } from '@next/third-parties/google';
import { siteConfig } from '@/app/_const/site-config';
import { ReactNode } from 'react';
import Container from '@/app/_components/container';
import Frame from '@/app/_components/frame';
import Decoration from '@/app/_components/decoration';

// Combine and export metadata for SEO
export const metadata = {
  ...baseMetadata,
  robots: { ...robotsMetadata },
  openGraph: { ...openGraphMetadata },
  twitter: { ...twitterMetadata },
};
export const viewport = { ...viewportMetadata };

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  const { siteLang } = siteMeta; // Site language
  const { siteAnalyticsID } = siteConfig; // Google Analytics ID

  return (
    <html lang={siteLang}>
      <body>
        <Header />
        <main>
          <Container>
            <Frame>{children}</Frame> {/* Main content wrapper */}
          </Container>
          <Decoration /> {/* Additional visual elements */}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId={siteAnalyticsID} />}
        {/* Include Google Analytics only in production environment */}
      </body>
    </html>
  );
}

export default RootLayout;
