import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap globally
import "@/styles/globals.css";                  // Global styles
import "@/styles/custom.css";                   // Custom styles

import Header from "@/components/Header";
// import FooterPage from "@/components/Footer";
import ImportBsJS from "../components/ImportBS/page";
import AOSInitializer from "@/components/AOSInitializer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Golf Kindle",
  description: "Golf Kindle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AOSInitializer />
          <Header />
          <ImportBsJS />
          <main>{children}</main>
          {/* <FooterPage /> */}
      </body>
    </html>
  );
}
