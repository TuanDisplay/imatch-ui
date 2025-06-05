import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import { usePayPremiumModal, usePremiumModal } from '~/hooks/useModalStore';

const PremiumModal = () => {
  const { setIsPayPremiumModal } = usePayPremiumModal();
  const { setIsPremiumModal } = usePremiumModal();

  const handlePremium = () => {
    setIsPayPremiumModal(true);
    setIsPremiumModal(false);
  };

  return (
    <>
      <Modal className="max-w-3xl bg-white px-6 py-6">
        <div className="mt-3">
          <h2 className="mb-1 text-xl font-bold">
            Trở thành thành viên Premium
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Truy cập đầy đủ tính năng và trải nghiệm không giới hạn.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Gói Phổ Thông */}
            <div className="rounded-xl border p-5">
              <h3 className="mb-1 text-lg font-bold">Gói Phổ Thông</h3>
              <p className="mb-4 text-sm text-gray-600">
                Trải nghiệm tính năng giới hạn, không mất phí.
              </p>
              <p className="mb-3 border-b pb-2 text-sm font-semibold text-gray-800">
                Miễn phí, nhưng giới hạn tính năng
              </p>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>✓ Các tính năng I-Match cơ bản</li>
              </ul>
            </div>

            {/* Gói Premium */}
            <div className="rounded-xl border p-5">
              <h3 className="mb-1 text-lg font-bold">Gói Premium</h3>
              <p className="mb-4 text-sm text-gray-600">
                Toàn quyền truy cập không giới hạn tính năng.
              </p>
              <div className="mb-3 flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-600">💎 VIP</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  99,000 đ/tháng
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>✓ Xem chi tiết các ý tưởng</li>
                <li>✓ Miễn phí 2 buổi tư vấn</li>
                <li>✓ Mở khóa tính năng ‘Đặt vấn đề’</li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Xem thêm
                  </a>
                </li>
              </ul>
              <Button
                className="mt-4 w-full rounded-md py-2 font-medium"
                premium
                onClick={handlePremium}
              >
                Nâng cấp Premium
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PremiumModal;
