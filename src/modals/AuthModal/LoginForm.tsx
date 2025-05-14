import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { TSetState } from '~/common/types';
import { TLoginSchema, loginSchema } from '~/common/schema';
import { Modal } from '~/components/Popup';
import { useAuthModal } from '~/hooks/useModalStore';
import * as authService from '~/services/auth.service';
import Button from '~/components/Button';

const classInput = 'w-full rounded-lg bg-white p-1.5 text-sm';

export default function LoginForm({ setState }: TSetState) {
  const { closeAuthModal, setIsAuthenticated } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

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
    <Modal>
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
              Tên đăng nhập
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

          {/* <label className="flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-sm">Ghi nhớ đăng nhập</span>
          </label> */}
          <Button type="submit" className="mt-3 w-full p-1 font-bold" primary>
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
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
