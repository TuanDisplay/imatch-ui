import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { ChildNode } from '~/common/types';

export default function ModalWrapper({ children }: ChildNode) {
  return createPortal(
    <div
      className={clsx(
        'bg-secondary absolute inset-0 z-50 flex items-center justify-center',
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
