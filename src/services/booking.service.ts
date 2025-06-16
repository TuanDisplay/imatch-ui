import { bookingRequest } from '~/lib/axios';

export const booking = async (expert_id: string, date: string) => {
  const res = await bookingRequest.get(
    `/expert/list_time_available/${expert_id}`,
    {
      params: { date },
    },
  );
  return res.data;
};

export const bookingTime = async (time_id: string) => {
  await bookingRequest.post(`/customer/book_time/${time_id}`);
};
