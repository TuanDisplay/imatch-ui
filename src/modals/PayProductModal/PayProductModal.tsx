import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IPaymentUser } from '~/common/types/user';
import LoadingAni from '~/components/Animation/LoadingAni';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import { usePayProductModal } from '~/hooks/useModalStore';
import * as paymentService from '~/services/payment.service';

interface PayProdProps {
  data: IPaymentUser | undefined;
  isLoading: boolean;
  product_id: string;
}

const PayProductModal = ({ data, isLoading, product_id }: PayProdProps) => {
  const { setIsPayProductModal } = usePayProductModal();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (data) {
        const res = await paymentService.webHookIdeas(
          data?.payment_uuid,
          'success',
          product_id,
          200000,
        );
        if (res.message) {
          setIsPayProductModal(false);
          navigate(-1);
          toast.success(res.message);
        } else {
          toast.error(res.error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal className="max-w-md rounded-xl bg-white px-3 py-3 shadow-xl">
      <div className="mx-auto mt-3 max-w-xs">
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black">
          &times;
        </button>

        <h2 className="mb-4 text-center text-xl font-bold">
          Thanh toán qua Mã QR
        </h2>

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

export default PayProductModal;
