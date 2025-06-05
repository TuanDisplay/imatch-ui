import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import { messageFormSchema, TMessageSchema } from '~/common/schema';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import { useMessageModal } from '~/hooks/useModalStore';
import * as messageService from '~/services/message.service';

interface IMessageModal {
  id: string;
  user_type: 'customer' | 'expert';
  receiver_name: string;
}

export default function MessageModal({
  id,
  user_type = 'customer',
  receiver_name,
}: IMessageModal) {
  const { setIsMessageModal } = useMessageModal();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TMessageSchema>({
    resolver: zodResolver(messageFormSchema),
    mode: 'onChange',
  });

  const title = watch('title');
  const content = watch('content');

  const isMessageDisable =
    title && content !== '<p><br></p>' && !errors.title && !errors.content;

  const onSubmit = async (data: TMessageSchema) => {
    try {
      await messageService.sendMessage(id, user_type, data);
      reset();
      queryClient.invalidateQueries({ queryKey: ['messageDe'] });
      setIsMessageModal(false);
      toast.success('Gửi tin nhắn thành công');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <Modal className="w-full max-w-lg rounded-xl bg-white shadow-2xl transition-all">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-6 pt-6 pb-2"
      >
        <h3 className="mb-2 text-base font-semibold text-gray-700">
          Tới:
          <span className="font-bold text-black">
            {receiver_name || 'Vô danh'}
          </span>
        </h3>

        <input
          type="text"
          {...register('title')}
          placeholder="Nhập tiêu đề..."
          className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              className="h-[200px] pb-10"
              placeholder="Nhập nội dung tin nhắn..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            disable={isSubmitting || !isMessageDisable}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
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
