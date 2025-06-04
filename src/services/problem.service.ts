import { TMessageSchema, TPostFormSchema } from '~/common/schema';
import { problemRequest } from '~/lib/axios';
import { mapPro } from '~/utils/map/problem';

export const postProblem = async (data: TPostFormSchema) => {
  const res = await problemRequest.post('/problem', {
    problemname: data.title,
    industry: data.majorSelect,
    content_detail: data.descTxtEdit,
    value_benefits: data.valueTxtEdit,
    price: data.price,
    is_intellect: Number(data.ipRadio),
    image_intellect: data.ipImgUpload,
    image: [
      data.relatedImgUpload,
      data.relatedImgUpload2,
      data.relatedImgUpload3,
    ],
  });
  return res.data;
};

export const problem = async (params: any) => {
  const res = await problemRequest.get('/problem', {
    params: params,
  });
  return res.data;
};

export const problemDetail = async (id: string) => {
  const res = await problemRequest.get(`/problem/${id}`);
  return res.data;
};

export const myProblem = async ({ pageParam }: { pageParam: number }) => {
  const res = await problemRequest.get('/problem/my-list', {
    params: { page: pageParam },
  });
  return res.data.items.map(mapPro);
};

export const deleteMyPro = async (id: string) => {
  const res = await problemRequest.delete(`/problem/${id}/delete-myproblem`);
  return res.data;
};

//fav problem
export const favProblem = async ({ pageParam }: { pageParam: number }) => {
  const res = await problemRequest.get('/problem/list-favorite', {
    params: { page: pageParam },
  });
  return res.data.items.map(mapPro);
};

export const addFavPro = async (id: string) => {
  await problemRequest.post('/problem/add-favorite', {
    post_uuid: id,
  });
};

export const favIdPro = async () => {
  const res = await problemRequest.get('/problem/list');
  return res.data.data;
};

export const deleteFavPro = async (id: string) => {
  await problemRequest.delete(`/favorite/${id}/delete`);
};

// solution

export const postSolution = async (id: string, data: TMessageSchema) => {
  await problemRequest.post('/solution/post-solution', {
    problem_uuid: id,
    title_solution: data.title,
    content: data.content,
  });
};

export const solutions = async (problem_id: string, params: any) => {
  const res = await problemRequest.get(`/problem/solution/${problem_id}`, {
    params: { params },
  });
  return res.data;
};

export const mySolutions = async ({ pageParam }: { pageParam: number }) => {
  const res = await problemRequest.get(`/solution`, {
    params: { page: pageParam },
  });
  return res.data.items;
};
