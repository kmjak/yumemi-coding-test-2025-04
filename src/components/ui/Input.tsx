import { JSX } from 'react';
import cn from '@/utils/tailwind/cn';

/**
 * @file InputのUIコンポーネント
 * @description InputのUIコンポーネントを提供します。
 * @param {string} className - 追加のクラス名
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - その他のプロパティ
 * @returns {JSX.Element} InputのUIコンポーネント
 *
 * @author @kmjak
 */

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      className={cn(
        'bg-gray-800 rounded-md border border-gray-700 outline-none opacity-60 focus:opacity-100 text-sm sm:text-base md:text-lg lg:text-xl w-40 h-6 sm:w-52 sm:h-8 md:w-64 md:h-10 lg:w-72',
        className
      )}
      {...props}
    />
  );
}
