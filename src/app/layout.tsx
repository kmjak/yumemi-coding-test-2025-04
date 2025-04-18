import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Amplify } from 'aws-amplify';
import { amplifyConf } from '@/conf/amplify/amplifyConf';
import ConfigureAmplifyClientSide from '@/components/amplify/ConfigureAmplifyClientSide';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // タイトル
  title: {
    /**
     * テンプレート用のタイトル
     * %sはページタイトルに置き換えられます。
     *
     * src/app/home/page.tsxのタイトルをHome | 人口変遷ナビ としたい場合
     * export const metadata: Metadata = {
     *  title: Home,
     *};
     */
    template: '%s | 人口変遷ナビ',
    // デフォルトのタイトル
    default: '人口変遷ナビ',
  },
  // このサイトの説明
  description:
    '都道府県別の総人口推移を視覚的に比較できるインタラクティブなアプリケーションです。地域ごとの人口変化を年代別に追跡し、日本の人口動態の全体像を把握できます。',
  icons: {
    icon: '/favicon.ico',
  },
};

// AWS Amplifyの設定
Amplify.configure(amplifyConf, { ssr: true });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <ConfigureAmplifyClientSide amplifyConf={amplifyConf} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
