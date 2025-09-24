import { Montserrat, Open_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";  
// import "@/styles/globals.css";                 
import "@/styles/custom.css";        
import "@/styles/responsive.css";            

import ImportBsJS from "../components/ImportBS/page";
import AOSInitializer from "@/components/AOSInitializer";
import { FormProvider } from "@/components/FormContext";

import Script from "next/script";
import VisitTracker from "./common/VisitTracker";
import ClientWrapper from "./common/ClientWrapper";


// Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
});

// Open Sans font
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Official Online Hotel Booking Website | The Clarks Hotels & Resorts | Top Hotels in India",
  description: "The Clarks Hotels & Resorts have some of the top hotels in India. We are also one of the biggest brands with properties spanning across the country.",
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "I9x6G8h-aFjeaB9WQnvGZB7I2S_mJnXDP0UlDnOlbzM",
  },
};
const GTM_ID = 'GTM-NS58VZVZ';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ GTM in server-rendered head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        {/* ✅ noscript part */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <FormProvider>
          <AOSInitializer />
          <ImportBsJS />
           <VisitTracker />
            {/* <ClientWrapper /> */}
          <main>{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}
