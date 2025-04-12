import { JSX } from 'react';
import cn from '@/utils/tailwind/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: string | JSX.Element;
}

/**
 * @file LabelのUIコンポーネント
 * @description ラベルのUIコンポーネントを提供します。
 * @param {string | JSX.Element} children - ラベルのメッセージ
 * @param {string} className - 追加のクラス名
 * @param {React.LabelHTMLAttributes<HTMLLabelElement>} props - その他のプロパティ
 * @returns {JSX.Element} ラベルのUIコンポーネント
 *
 * @author @kmjak
 */

export default function Label({ children, className, ...props }: LabelProps): JSX.Element {
  return (
    <label
      className={cn('text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl', className)}
      {...props}
    >
      {children}
    </label>
  );
}
