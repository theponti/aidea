import { Inter } from "next/font/google";

import Header from "@/components/Header";

import { TRPCReactProvider } from "@/lib/trpc/react";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

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
      <body className={font.className} data-theme="lofi">
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
