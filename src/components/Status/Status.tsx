import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { ReactNode } from 'react';

interface StatusProps {
  pending?: boolean;
  accept?: boolean;
  reject?: boolean;
  children: ReactNode;
}

export default function Status({
  pending,
  accept,
  reject,
  children,
}: StatusProps) {

  return (
    <div className="flex items-center gap-2">
      <Circle
        size={8}
        stroke="none"
        className={clsx('rounded-full', {
          'bg-primary': pending,
          'bg-green-500': accept,
          'bg-red-500': reject,
        })}
      />
      <span
        className={clsx('text-sm', {
          'text-primary': pending,
          'text-green-500': accept,
          'text-red-500': reject,
        })}
      >
        {children}
      </span>
    </div>
  );
}
