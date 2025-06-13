import { useState } from 'react';
import { Modal } from '~/components/Popup';
import Button from '~/components/Button';
import { useBookingModal } from '~/hooks/useModalStore';
import clsx from 'clsx';

const timeSlots = [
  { start: '08:00', end: '09:00' },
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
];

const BookingModal = () => {
  const { setIsBookingModal } = useBookingModal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex === null) return;

    const selectedSlot = timeSlots[selectedIndex];
    console.log('Slot đã chọn:', selectedSlot);

    // Gửi data, gọi API... tùy bạn
    setIsBookingModal(false);
  };

  return (
    <Modal className="w-full max-w-md rounded-xl bg-white px-5 py-4 shadow-lg">
      <h2 className="my-4 text-xl font-semibold">Chọn thời gian đặt lịch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Chọn ngày
          </label>
          <input
            type="date"
            // value={selectedDate}
            // onChange={(e) => {
            //   setSelectedDate(e.target.value);
            //   setSelectedIndex(null); // reset slot
            // }}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={clsx(
                'cursor-pointer rounded-lg border p-3 text-sm font-medium transition',
                selectedIndex === index
                  ? 'border-blue-500 bg-blue-100 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300',
              )}
            >
              {slot.start} - {slot.end}
            </button>
          ))}
        </div>
        <Button
          type="submit"
          className="w-full py-2"
          primary
          disable={selectedIndex === null}
        >
          Xác nhận đặt lịch
        </Button>
      </form>
    </Modal>
  );
};

export default BookingModal;
