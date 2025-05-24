import { TProfileSchema } from '~/common/schema';
import { customerRequest } from '~/lib/axios';

export const profile = async () => {
  const res = await customerRequest.get('/customer/my-profile');
  return res.data;
};

export const updateProfile = async (data: TProfileSchema) => {
  await customerRequest.put(`/customer/${data.id}`, {
    username: data.fname,
    image: data.avatar,
    introduce: data.bio,
  });
};
