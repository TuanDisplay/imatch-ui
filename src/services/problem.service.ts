import { TPostFormSchema } from "~/common/schema";
import { problemRequest } from "~/lib/axios";

export const postProblem = async (data: TPostFormSchema) => {
  const res = await problemRequest.post(
    '/problem',
    {
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
    }
  );
  return res.data;
};

export const problem = async() => {
     const res = await problemRequest.get(
    '/problem',
  );
  return res.data;
}

export const problemDetail = async (id: string) => {
  const res = await problemRequest.get(`/problem/${id}`);
  return res.data;
};

export const myProblem = async () => {
  const res = await problemRequest.get('/problem/my-list');
  return res.data;
};