import { TPostFormSchema } from '~/common/schema';
import httpRequest from '~/utils/httpRequest';

export const ideas = async () => {
  const res = await httpRequest.get(
    '/ideas',
    //   , {
    //   headers: { 'x-token': token },
    // }
  );
  return res.data;
};

export const postIdeas = async (data: TPostFormSchema) => {
  const res = await httpRequest.post(
    '/ideas',
    {
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
    }
  );
  return res.data;
};

export const ideaDetail = async () => {
  const res = await httpRequest.get('/ideas/:uuid');
  return res.data;
};
