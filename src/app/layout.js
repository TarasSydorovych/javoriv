import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics gaId="G-86PXQF00YP" />
        {children}
      </body>
    </html>
  );
}
