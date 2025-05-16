import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import * as authService from '~/services/auth.service';
import { TSetState } from '~/common/types';
import { TLoginSchema, loginSchema } from '~/common/schema';
import { Modal } from '~/components/Popup';
import { useAuthModal } from '~/hooks/useModalStore';
import Button from '~/components/Button';

const classInput = 'w-full rounded-lg bg-white p-1.5 text-sm';

export default function LoginForm({ setState }: TSetState) {
  const { closeAuthModal, setIsAuthenticated } = useAuthModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const email = watch('email');
  const password = watch('password');

  const isSignInDisabled =
    email && password && !errors.email && !errors.password;

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const token = await authService.login(data);
      toast.success('Đăng nhập thành công! 🎉');
      localStorage.setItem('accessToken', token);
      closeAuthModal();
      setIsAuthenticated(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <Modal className="min-h-[100px] max-w-sm bg-gradient-to-r from-[#f3e9e8] to-[#96b9d9]">
      <div className="px-5 py-2">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Đăng nhập tài khoản I-Match</h1>
          <p className="text-center text-xs font-light text-red-500">
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
            dụng chung sẽ bị khóa.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-4 rounded p-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              Email của bạn
            </label>
            <input
              type="text"
              {...register('email')}
              id="email"
              placeholder="Email"
              className={classInput}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
            <input
              type="password"
              {...register('password')}
              placeholder="Mật khẩu"
              className={classInput}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-3 w-full p-1 font-bold"
            primary
            disable={!isSignInDisabled}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </form>

        <div className="flex justify-center gap-1 text-sm">
          <p>Bạn chưa có tài khoản?</p>
          <Button
            className="text-primary font-bold underline"
            onClick={() => setState(false)}
          >
            Đăng ký
          </Button>
        </div>

        <p className="p-2 text-center text-xs font-light">
          Việc bạn tiếp tục sử dụng trang web này đồng nghĩa đồng ý với
          <span className="underline"> điều khoản sử dụng</span> của chúng tôi
        </p>
      </div>
    </Modal>
  );
}
