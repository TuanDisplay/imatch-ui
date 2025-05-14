import httpRequest from '~/utils/httpRequest';

export const ideas = async () => {
  const res = await httpRequest.get('/ideas'
  //   , {
  //   headers: { 'x-token': token },
  // }
);
  return res.data;
};

export const ideaDetail = async () => {
  const res = await httpRequest.get('/ideas/:uuid');
  return res.data;
};
