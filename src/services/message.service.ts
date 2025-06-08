import { TMessageSchema } from '~/common/schema';
import messageRequest from '~/lib/axios/messageRequest';

export const messages = async () => {
  const res = await messageRequest.get('/messages');
  return res.data;
};

export const sendMessage = async (
  id: string,
  receiver_type: string,
  data: TMessageSchema,
) => {
  await messageRequest.post('/messages', {
    receiver_uuid: id,
    receiver_type: receiver_type,
    title: data.title,
    content: data.content,
  });
};

export const oldMessage = async (id: string) => {
  const res = await messageRequest.get(`/messages/${id}`);
  return res.data;
};
