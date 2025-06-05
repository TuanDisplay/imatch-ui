import ratingRequest from "~/lib/axios/ratingRequest";

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
