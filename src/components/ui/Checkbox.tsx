import { JSX } from 'react';
import cn from '@/utils/tailwind/cn';

/**
 * @file CheckboxのUIコンポーネント
 * @description チェックボックスのUIコンポーネントを提供します。
 * @param {string} className - 追加のクラス名
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - その他のプロパティ
 * @returns {JSX.Element} チェックボックスのUIコンポーネント
 *
 * @author @kmjak
 */

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({ className, ...props }: CheckboxProps): JSX.Element {
  return (
    <input
      type="checkbox"
      className={cn(
        'peer w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent',
        className
      )}
      {...props}
    />
  );
}
