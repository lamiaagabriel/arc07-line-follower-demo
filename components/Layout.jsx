import Head from "next/head";

import Header from "./Templates/Header";
import Footer from "./Templates/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="The Line Follower Competition Form Held By APEL"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className="grow flex">{children}</main>
      <Footer />
    </>
  );
}
