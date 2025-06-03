import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { IPaymentUser } from '~/common/types/user';
import LoadingAni from '~/components/Animation/LoadingAni';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import * as paymentService from '~/services/payment.service';

const PaymentModal = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: async (): Promise<IPaymentUser> => {
      const res = await paymentService.goPremium();
      return res;
    },
  });

  const handleSubmit = async () => {
    try {
      if (data) {
        const res = await paymentService.webHookPremium(
          data?.payment_uuid,
          'success',
          100000,
        );
        if (res.message) {
          toast.success(res.message);
        } else {
          toast.error(res.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal className="max-w-md rounded-xl bg-white px-3 py-3 shadow-xl">
      <div className="mx-auto mt-3 max-w-xs">
        {/* Đóng modal */}
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black">
          &times;
        </button>

        <h2 className="mb-4 text-center text-xl font-bold">
          Thanh toán qua Mã QR
        </h2>

        {/* QR code (giả định hình ảnh tĩnh) */}
        <div className="mb-6 flex justify-center">
          <div className="relative rounded-lg border">
            {isLoading ? (
              <LoadingAni />
            ) : (
              <img
                src={data?.qr_image}
                alt="QR Code"
                className="h-48 w-48 object-contain"
              />
            )}
          </div>
        </div>

        {/* Nút xác nhận */}
        <Button
          className="text-bold w-full py-2"
          primary
          onClick={handleSubmit}
        >
          Xác nhận đã thanh toán
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
