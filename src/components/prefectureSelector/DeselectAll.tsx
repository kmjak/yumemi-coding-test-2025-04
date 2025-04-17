'use client';

import { JSX } from 'react';
import Button from '@/components/ui/Button';

interface DeselectAllProps {
  handleDeselectAllPrefCodes: () => void;
}
export default function DeselectAll({ handleDeselectAllPrefCodes }: DeselectAllProps): JSX.Element {
  return (
    <div className="py-2 md:py-0 mx-auto md:mx-2 w-60 sm:w-76 md:w-28">
      <Button
        className="bg-red-700 hover:bg-red-800 w-full py-2"
        onClick={handleDeselectAllPrefCodes}
      >
        選択解除
      </Button>
    </div>
  );
}
