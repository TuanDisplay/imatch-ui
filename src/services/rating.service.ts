import ratingRequest from '~/lib/axios/ratingRequest';

// export const messages = async (expert_id: string, params: number) => {
//   const res = await ratingRequest.get(`/customer/rating/${expert_id}`, {
//     params: { params },
//   });
//   return res.data;
// };

export const expReview = async (expert_id: string) => {
  const res = await ratingRequest.get(`/customer/rating/${expert_id}`);
  return res.data;
};

export const postReview = async (
  expert_id: string,
  rating: number,
  comment: string,
) => {
  const res = await ratingRequest.post('/customer/rating', {
    expert_uuid: expert_id,
    rating: rating,
    comment: comment,
  });
  return res.data;
};
