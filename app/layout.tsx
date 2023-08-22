import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const instruments_sans = Instrument_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--instrument-sans",
});

export const metadata: Metadata = {
  title: "Devlinks",
  description: "share your links with the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instruments_sans.variable}>
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
