import { TMessageSchema } from '~/common/schema';
import messageRequest from '~/lib/axios/messageRequest';

export const sendMessage = async (id: string, data: TMessageSchema) => {
  await messageRequest.post('/messages', {
    receiver_uuid: id,
    title: data.title,
    content: data.content,
  });
};

export const oldMessage = async (id: string) => {
  const res = await messageRequest.get(`/messages/${id}`);
  return res.data;
};
