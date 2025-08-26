import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Head from "next/head";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aidifys – Hiring",
  description: "Discover top UK jobs across IT, healthcare, finance, engineering & more at Aidifys.com.Browse full- time, part-time, remote & freelance job opportunities in major cities like London, Manchester & Birmingham.Start your job search today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="pt-[90px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
