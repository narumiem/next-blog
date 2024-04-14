import '@/app/_styles/globals.css';
import '@/app/_const/font-awesome';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import {
  baseMetadata,
  robotsMetadata,
  openGraphMetadata,
  twitterMetadata,
  viewportMetadata,
  siteMetadata,
} from '@/app/_lib/metadata';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ReactNode } from 'react';
import Container from '@/app/_components/container';
import Frame from '@/app/_components/frame';
import Decoration from '@/app/_components/decoration';

// Define the metadata object
export const metadata = {
  ...baseMetadata,
  robots: { ...robotsMetadata },
  openGraph: { ...openGraphMetadata },
  twitter: { ...twitterMetadata },
};

// Define the viewport object
export const viewport = { ...viewportMetadata };

/**
 * Props for the RootLayout component
 */
interface RootLayoutProps {
  children: ReactNode;
}

/**
 * RootLayout that serves as the main layout for the application
 * @param children - The child components to be rendered within the layout
 * @returns The rendered RootLayout
 */
function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  const { siteLang, siteGoogleAnalyticsID } = siteMetadata;
  return (
    <html lang={siteLang}>
      <body>
        <Header />
        <main>
          <Container>
            <Frame>{children}</Frame>
          </Container>
          <Decoration />
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId={siteGoogleAnalyticsID} />}
      </body>
    </html>
  );
}

export default RootLayout;
