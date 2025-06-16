import { notificationRequest } from '~/lib/axios';

export const notification = async () => {
  const res = await notificationRequest.get('/notification');
  return res.data;
};
