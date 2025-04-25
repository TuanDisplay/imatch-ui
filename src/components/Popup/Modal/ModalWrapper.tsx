import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { IChildNode } from '~/common/types';

export default function ModalWrapper({ children }: IChildNode) {
  return createPortal(
    <div
      className={clsx(
        'bg-secondary fixed inset-0 z-50 flex items-center justify-center',
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
