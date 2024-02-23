import { Metadata } from "next";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";

import NextIntlProvider from "../../utils/i18n/NextIntlProvider";
import ReduxStoreProvider from "./ReduxStoreProvider";

import "./globals.css";
import { Inter } from "next/font/google";
import { NavBar } from "../../components/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Choco", template: "%s | My Website" },
  description: "Written by YoWuzzup",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = useLocale();

  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`))
      .default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <ReduxStoreProvider>
        <body className={inter.className}>
          <NextIntlProvider
            locale={params.locale}
            messages={messages}
            timeZone="Europe/Szczecin"
            now={new Date()}
          >
            <NavBar />
            {children}
          </NextIntlProvider>
        </body>
      </ReduxStoreProvider>
    </html>
  );
}
