import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div lang={"en"} className={dmSans.className}>
      <Head>
        <link rel="icon" type="image/png" href="/AbeerDas.png?v=3" />
        <link rel="shortcut icon" type="image/png" href="/AbeerDas.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/AbeerDas.png?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/AbeerDas.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/AbeerDas.png?v=3" />
        <link rel="apple-touch-icon" href="/AbeerDas.png?v=3" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
