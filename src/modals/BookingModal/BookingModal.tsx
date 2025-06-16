import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

import { Modal } from '~/components/Popup';
import { IExpFreeTimeApi } from '~/common/types/booking';
import { convertIsoHour } from '~/utils/files';
import Button from '~/components/Button';
import * as bookingService from '~/services/booking.service';
import { useBookingModal } from '~/hooks/useModalStore';

const BookingModal = ({ id }: { id: string }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setIsBookingModal } = useBookingModal();

  const { data: bookingData } = useQuery({
    queryKey: ['booking', selectedDate],
    queryFn: async (): Promise<IExpFreeTimeApi[]> => {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      const res = await bookingService.booking(id, formatted);
      return res.data;
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await bookingService.bookingTime(selectedId);
      setIsBookingModal(false);
      toast.success('Đã đặt lịch hẹn');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <Modal className="w-full max-w-md rounded-xl bg-white px-5 py-4 shadow-lg">
      <h2 className="my-4 text-xl font-semibold">Chọn thời gian đặt lịch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Chọn ngày
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              if (date) {
                setSelectedDate(date);
                setSelectedId('');
              }
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
          />
        </>
        <>
          {Array.isArray(bookingData) && bookingData?.length === 0 ? (
            <div className="text-center">Không có lịch rảnh vào ngày này</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {bookingData?.map((slot) => (
                <button
                  key={slot.Uuid}
                  type="button"
                  onClick={() => setSelectedId(slot.Uuid)}
                  className={clsx(
                    'cursor-pointer rounded-lg border p-3 text-sm font-medium transition',
                    selectedId === slot.Uuid
                      ? 'border-blue-500 bg-blue-100 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300',
                  )}
                >
                  {convertIsoHour(slot.StartDateTime)} -
                  {convertIsoHour(slot.EndDateTime)}
                </button>
              ))}
            </div>
          )}
        </>
        <Button
          type="submit"
          className="w-full py-2"
          primary
          disable={selectedId === ''}
        >
          Xác nhận đặt lịch
        </Button>
      </form>
    </Modal>
  );
};

export default BookingModal;
