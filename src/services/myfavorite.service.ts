import { customerRequest } from '~/lib/axios';

export const favList = async () => {
  const res = await customerRequest.get('/customer/list-favorite');
  return res.data;
};

type postType = 'ideas' | 'problem';

export const addFav = async (id: string, postType: postType) => {
  await customerRequest.post('/customer/add-favorite', {
    post_uuid: id,
    post_type: postType,
  });
};

export const deleteFav = async (id: string) => {
  await customerRequest.delete(`/customer/${id}/delete-favorite`);
};
