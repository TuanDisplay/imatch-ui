import httpRequest from '~/utils/httpRequest';

export const ideas = async (token?: string) => {
  const res = await httpRequest.get('/customer/ideas', {
    headers: { 'x-token': token },
  });
  return res.data;
};

export const ideaDetail = async () => {
  const res = await httpRequest.get('/customer/ideas/:uuid');
  return res.data;
};
