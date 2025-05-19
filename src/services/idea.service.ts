import { TPostFormSchema } from '~/common/schema';
import { ideaRequest } from '~/lib/axios';

export const postIdeas = async (data: TPostFormSchema) => {
  const res = await ideaRequest.post('/ideas', {
    ideasname: data.title,
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

export const ideas = async () => {
  const res = await ideaRequest.get('/ideas');
  return res.data;
};

export const ideaDetail = async (id: string) => {
  const res = await ideaRequest.get(`/ideas/${id}`);
  return res.data;
};

export const myIdeas = async () => {
  const res = await ideaRequest.get('/ideas/my-list');
  return res.data;
};
