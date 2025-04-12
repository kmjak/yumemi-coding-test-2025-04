import { JSX } from 'react';
import cn from '@/utils/tailwind/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
}

/**
 * @file ButtonのUIコンポーネント
 * @description ボタンのUIコンポーネントを提供します。
 * @param {string | JSX.Element} children - ボタンのメッセージ
 * @param {string} className - 追加のクラス名
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - その他のプロパティ
 * @returns {JSX.Element} ボタンのUIコンポーネント
 *
 * @author @kmjak
 */
export default function Button({ children, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(
        'outline-none rounded-lg bg-blue-600 hover:bg-blue-800 duration-200 text-base sm:text-lg md:text-xl lg:text-2xl px-2 py-1 md:px-3 md:py-2 lg:px-4',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
