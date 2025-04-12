import { JSX } from 'react';
import cn from '@/utils/tailwind/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({ className, ...props }: CheckboxProps): JSX.Element {
  return (
    <input
      type="checkbox"
      className={cn(
        'peer appearance-none w-5 h-5 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent',
        className
      )}
      {...props}
    />
  );
}
