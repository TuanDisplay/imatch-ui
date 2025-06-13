import { bookingRequest } from '~/lib/axios';

export const booking = async ({ expert_id }: { expert_id: string }) => {
  const res = await bookingRequest.get(
    `/expert/list_time_available/${expert_id}`,
  );
  return res.data;
};

export const bookingTime = async ({ time_id }: { time_id: string }) => {
  await bookingRequest.post(`/customer/book_time/${time_id}`);
};
