import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, TRegisterSchema, TSetState } from '~/common/types';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';

const classInput = 'w-full rounded-lg bg-white p-1.5 text-sm';

export default function RegisterForm({ setState }: TSetState) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: TRegisterSchema) => {
    console.log('Dữ liệu hợp lệ:', data);
    // Gọi API đăng nhập ở đây
  };

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
            <label htmlFor="username" className="font-bold">
              Tên hiển thị?
            </label>
            <input
              type="text"
              {...register('username')}
              id="username"
              placeholder="Tên hiển thị dưới bài đăng của bạn"
              className={classInput}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
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
          <div className="">
            <div className="mt-3 h-[1px] w-full bg-black"></div>
            <div className="mt-3 flex w-full overflow-hidden rounded-lg">
              <input
                type="text"
                placeholder="Mã xác thực"
                className="flex-1 bg-white p-1.5 text-sm outline-0"
              />
              <Button
                type="button"
                className="primary-radius-none px-2 font-medium"
              >
                Gửi mã
              </Button>
            </div>

            <Button type="submit" className="primary mt-3 w-full p-1 font-bold">
              Đăng ký
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
