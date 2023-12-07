import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import NextIntlProvider from "./NextIntlProvider";
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
    <html lang={locale}>
      <ReduxStoreProvider>
        <NextIntlProvider
          locale={params.locale}
          messages={messages}
          timeZone="Europe/Berlin"
          now={new Date()}
        >
          <body className={inter.className}>
            <NavBar />
            {children}
          </body>
        </NextIntlProvider>
      </ReduxStoreProvider>
    </html>
  );
}
