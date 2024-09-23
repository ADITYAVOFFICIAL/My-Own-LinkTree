import { AppProps } from 'next/app';
import Script from 'next/script';
import '../app/globals.css'; // Adjust the path if needed

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;