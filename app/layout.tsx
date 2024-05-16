import { Public_Sans } from "next/font/google";

import Header from "@/components/Header";

import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AIdea</title>
        <meta name="description" content="manage your mind with ease." />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta property="og:title" content="AIdea" />
        <meta property="og:description" content="manage your mind with ease" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="manage your mind with ease" />
        <meta name="twitter:description" content="manage your mind with ease" />
        <meta name="twitter:image" content="/images/og-image.png" />
      </head>
      <body className={publicSans.className} data-theme="lofi">
        <Header />
        {children}
      </body>
    </html>
  );
}
