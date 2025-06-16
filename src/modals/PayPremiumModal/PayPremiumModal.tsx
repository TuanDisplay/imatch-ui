import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import LoadingAni from '~/components/Animation/LoadingAni';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import { usePayPremium } from '~/hooks/ApiQuery/usePaymentQuery';
import { useAuthModal, usePremiumModal } from '~/hooks/useModalStore';
import * as paymentService from '~/services/payment.service';
import * as authService from '~/services/auth.service';
import { useNavigate } from 'react-router-dom';

const PayPremiumModal = () => {
  const { data, isLoading } = usePayPremium();
  const { setIsAuthenticated } = useAuthModal();
  const { setGoPremium } = usePremiumModal();
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      setGoPremium(false);
      setIsAuthenticated(false);
      navigate('/');
      toast.success('Đăng xuất thành công! 🎉');
    } catch (err) {
      const error = err as AxiosError<{ message: string; codeStatus: number }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        const res = await paymentService.webHookPremium(
          data?.payment_uuid,
          'success',
          100000,
        );
        logoutHandle();
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

export default PayPremiumModal;
