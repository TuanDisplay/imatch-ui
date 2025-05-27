import { customerRequest, expertRequest } from '~/lib/axios';

export const expert = async (params: any) => {
  const res = await expertRequest.get('/expert', {
    params: { params },
  });
  return res.data;
};

export const expertDetail = async (id: string) => {
  const res = await expertRequest.get(`/expert/${id}`);
  return res.data;
};

export const expertReview = async (id: string) => {
  const res = await customerRequest.get(`/customer/rating/${id}`);
  return res.data;
};
