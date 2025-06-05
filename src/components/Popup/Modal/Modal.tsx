import clsx from 'clsx';
import Button from '~/components/Button';
import ModalWrapper from './ModalWrapper';
import { ChevronLeft } from 'lucide-react';
import { IChildNode } from '~/common/types';
import { useCallback, useEffect, useRef } from 'react';
import {
  useAuthModal,
  useBookingModal,
  useMessageModal,
  usePayPremiumModal,
  usePayProductModal,
  usePremiumModal,
  useSolutionModal,
} from '~/hooks/useModalStore';

interface IModal extends IChildNode {
  className: string;
}

export default function Modal({ children, className = '' }: IModal) {
  const { closeAuthModal } = useAuthModal();
  const { setIsBookingModal } = useBookingModal();
  const { setIsMessageModal } = useMessageModal();
  const { setIsSolutionModal } = useSolutionModal();
  const { setIsPremiumModal } = usePremiumModal();
  const { setIsPayPremiumModal } = usePayPremiumModal();
  const { setIsPayProductModal } = usePayProductModal();

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModalHandle = useCallback(() => {
    closeAuthModal();
    setIsBookingModal(false);
    setIsMessageModal(false);
    setIsSolutionModal(false);
    setIsPremiumModal(false);
    setIsPayPremiumModal(false);
    setIsPayProductModal(false);
  }, [
    closeAuthModal,
    setIsBookingModal,
    setIsMessageModal,
    setIsSolutionModal,
    setIsPremiumModal,
    setIsPayPremiumModal,
    setIsPayProductModal,
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModalHandle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [closeModalHandle]);

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className={clsx(
          'font-VNPro w-full overflow-hidden overflow-y-auto rounded-lg px-2 py-3',
          className,
        )}
      >
        <Button
          className="text text-sm font-medium"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          onClick={closeModalHandle}
        >
          Quay lại
        </Button>
        {children}
      </div>
    </ModalWrapper>
  );
}
