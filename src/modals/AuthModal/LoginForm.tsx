import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema, TRegisterSchema, TSetState } from '~/common/types';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';

const classInput = 'w-full rounded-lg bg-white p-1.5 text-sm';

export default function LoginForm({ setState }: TSetState) {
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

          <label className="flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-sm">Ghi nhớ đăng nhập</span>
          </label>
          <Button type="submit" className="primary mt-3 w-full p-1 font-bold">
            Đăng nhập
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
