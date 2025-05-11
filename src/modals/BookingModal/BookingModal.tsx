import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import {  } from '';

import Button from '~/components/Button';
import { bookingFormSchema, TBookingSchema } from '~/common/schema';
import { Modal } from '~/components/Popup';

export default function BookingModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookingSchema>({ resolver: zodResolver(bookingFormSchema) });

  const onSubmit = (data: any) => {
    const bookingInfo = {
      fname: data.fname,
      date: data.date,
      time: data.time,
      iso: new Date(`${data.date}T${data.time}`).toISOString(),
    };
    const JBooking = JSON.stringify(bookingInfo);
    localStorage.setItem(data.fname, JBooking);
  };

  return (
    <Modal>
      <div className="max-w-md space-y-4 px-8 py-6">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Đặt Lịch
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="fname"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Họ Và Tên
            </label>
            <input
              id="fname"
              {...register('fname')}
              type="text"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập họ tên"
            />
            {errors.fname && (
              <p className="text-sm text-red-500">{errors.fname.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="bookingDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Chọn ngày hẹn
            </label>
            <input
              type="date"
              {...register('date')}
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="bookingTime"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Chọn thời gian
            </label>
            <input
              id="bookingTime"
              {...register('time')}
              type="time"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>
          <Button className="w-full py-2 font-semibold" primary>
            Xác nhận
          </Button>
        </form>
      </div>
    </Modal>
  );
}
