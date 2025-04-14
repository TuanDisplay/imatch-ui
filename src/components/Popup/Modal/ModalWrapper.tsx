import { createPortal } from 'react-dom';
import { ChildNode } from '~/common/type';

export default function ModalWrapper({ children }: ChildNode) {
  return createPortal(
    <div className="bg-secondary fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>,
    document.body,
  );
}
