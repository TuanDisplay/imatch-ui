import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { messageFormSchema, TMessageSchema } from '~/common/schema';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';

export default function MessageModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TMessageSchema>({
    resolver: zodResolver(messageFormSchema),
    mode: 'onChange',
  });

  const title = watch('title');
  const content = watch('content');

  const isMessageDisable = title && content && !errors.title && !errors.content;

  const onSubmit = async () => {
    toast.success('Gửi thành công!!!');
  };

  return (
    <Modal className="w-full max-w-lg rounded-xl bg-white shadow-2xl transition-all">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-6 pt-6 pb-2"
      >
        <h3 className="mb-2 text-base font-semibold text-gray-700">
          Tới: <span className="font-bold text-black">Ths. Phan Thị Hồng</span>
        </h3>

        <input
          type="text"
          {...register('title')}
          placeholder="Nhập tiêu đề..."
          className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
        />

        <textarea
          {...register('content')}
          placeholder="Nhập nội dung tin nhắn..."
          className="min-h-[140px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
        ></textarea>

        <div className="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            disable={!isMessageDisable}
          >
            Gửi
          </Button>
        </div>

        <p className="mt-2 text-right text-xs text-gray-400">
          {new Date().toLocaleString('vi-VN', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </form>
    </Modal>
  );
}
