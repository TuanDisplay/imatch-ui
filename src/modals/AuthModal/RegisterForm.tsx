import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

import * as authService from '~/services/auth.service';
import { TSetState } from '~/common/types';
import { TRegisterSchema, registerSchema } from '~/common/schema';
import { Modal } from '~/components/Popup';
import { useAuthModal } from '~/hooks/useModalStore';
import Button from '~/components/Button';

const classInput = 'w-full rounded-lg bg-white p-1.5 text-sm';

export default function RegisterForm({ setState }: TSetState) {
  const [isCodeSent, setCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const { closeAuthModal } = useAuthModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const displayName = watch('fname');
  const email = watch('email');
  const password = watch('password');

  const isSendCodeDisabled =
    displayName &&
    email &&
    password &&
    !errors.email &&
    !errors.password &&
    !errors.fname;

  const handleSendCode = async (data: TRegisterSchema) => {
    try {
      await authService.signUp(data);
      setCodeSent(true);
      setTimeLeft(30);
      toast.success('Mã xác nhận đã được gửi đến email!');
    } catch (err) {
      const error = err as AxiosError<{ message: string; codeStatus: number }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      await authService.sendCode(data);
      toast.success('Đăng ký thành công!');
      closeAuthModal();
    } catch (err) {
      const error = err as AxiosError<{ message: string; codeStatus: number }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <Modal>
      <div className="px-5 py-2">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Đăng ký tài khoản I-Match</h1>
          <p className="text-center text-xs font-light text-red-500">
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
            dụng chung sẽ bị khóa.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-4 rounded px-4 py-2"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="fname" className="font-bold">
              Tên hiển thị?
            </label>
            <input
              type="text"
              {...register('fname')}
              id="fname"
              placeholder="Tên hiển thị dưới bài đăng của bạn"
              className={classInput}
            />
            {errors.fname && (
              <p className="text-xs text-red-500">{errors.fname.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              Email của bạn
            </label>
            <input
              type="email"
              {...register('email')}
              className={classInput}
              id="email"
              placeholder="Địa chỉ email"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}

            <input
              type="password"
              {...register('password')}
              className={classInput}
              id="password"
              placeholder="Mật khẩu"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <div className="mt-3 h-[1px] w-full bg-black"></div>
            <div className="mt-3 flex w-full overflow-hidden rounded-lg">
              <input
                type="number"
                {...register('code')}
                placeholder="Mã xác thực"
                minLength={6}
                className="flex-1 bg-white p-1.5 text-sm outline-0 disabled:bg-gray-400"
                disabled={!isCodeSent}
              />
              <Button
                type="button"
                className="w-20 rounded-none px-2 font-medium"
                primary
                disable={!isSendCodeDisabled || timeLeft > 0}
                onClick={handleSubmit(handleSendCode)}
              >
                {timeLeft > 0 ? timeLeft + ' s' : 'Gửi mã'}
              </Button>
            </div>
            {errors.code && (
              <p className="text-xs text-red-500">{errors.code.message}</p>
            )}

            <Button type="submit" className="mt-3 w-full p-1 font-bold" primary>
              {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </div>

          <div className="mt-2 flex justify-center gap-1 text-sm">
            <p>Bạn đã có tài khoản?</p>
            <Button
              type="button"
              className="text-primary font-bold underline"
              onClick={() => setState(true)}
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
