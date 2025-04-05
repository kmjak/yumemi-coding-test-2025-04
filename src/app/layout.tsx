import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
    // テンプレートタイトル
    template: '%s | 人口変遷ナビ',
    // デフォルトタイトル
    default: '人口変遷ナビ',
  },
  // このサイトの説明
  description:
    '都道府県別の総人口推移を視覚的に比較できるインタラクティブなアプリケーションです。地域ごとの人口変化を年代別に追跡し、日本の人口動態の全体像を把握できます。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
