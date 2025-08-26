// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import Head from "next/head";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Aidifys – Hiring",
//   description: "Discover top UK jobs across IT, healthcare, finance, engineering & more at Aidifys.com",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         <link rel="icon" href="/Logo.jpg" />
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Navbar />
//         <main className="pt-[90px]">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }



import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description:
    "Discover top UK jobs across IT, healthcare, finance, engineering & more at Aidifys.com",
  icons: {
    icon: "/Logo.jpg",
  },
  openGraph: {
    title: "Aidifys – Hiring",
    description:
      "Discover top UK jobs across IT, healthcare, finance, engineering & more at Aidifys.com",
    url: "https://www.aidifys.com",
    siteName: "Aidifys",
    images: [
      {
        url: "/Logo.jpg",
        width: 1200,
        height: 630,
        alt: "Aidifys Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aidifys – Hiring",
    description:
      "Discover top UK jobs across IT, healthcare, finance, engineering & more at Aidifys.com",
    images: ["/Logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-[90px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
