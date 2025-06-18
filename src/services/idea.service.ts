import { TPostFormSchema } from '~/common/schema';
import { ideaRequest } from '~/lib/axios';
import { mapIdea, mapIdeaFav } from '~/utils/map/idea';

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

export const ideas = async (params?: any) => {
  const res = await ideaRequest.get('/ideas', {
    params: params,
  });
  return res.data;
};

export const ideaDetail = async (id: string) => {
  const res = await ideaRequest.get(`/ideas/${id}`);
  return res.data;
};

// my idea

export const myIdeas = async ({ pageParam }: { pageParam: number }) => {
  const res = await ideaRequest.get('/ideas/my-list', {
    params: { page: pageParam },
  });
  return res.data.items.map(mapIdea);
};

export const deleteMyIdeas = async (id: string) => {
  const res = await ideaRequest.delete(`/ideas/${id}/delete-myidea`);
  return res.data;
};

export const myIdeasEdit = async (idea_id: string, data: TPostFormSchema) => {
  await ideaRequest.put(`/ideas/${idea_id}/update-myidea`, {
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
};

export const getIdeaDeEdit = async (idea_id: string) => {
  const res = await ideaRequest.get(`/ideas/${idea_id}/my-detail-for-update`);
  return res.data;
};

// fav idea

export const favIdeas = async ({ pageParam }: { pageParam: number }) => {
  const res = await ideaRequest.get('/ideas/list-favorite', {
    params: { page: pageParam },
  });
  return res.data.items.map(mapIdeaFav);
};

export const addFavIdeas = async (id: string) => {
  await ideaRequest.post('/ideas/add-favorite', {
    post_uuid: id,
  });
};

export const favIdIdeas = async () => {
  const res = await ideaRequest.get('/ideas/list');
  return res.data.data;
};

export const deleteFavIdeas = async (id: string) => {
  await ideaRequest.delete(`/favorite/${id}/delete`);
};

// buy ideas

export const buyIdeas = async ({ pageParam }: { pageParam: number }) => {
  const res = await ideaRequest.get('/ideas/buy-idea', {
    params: { page: pageParam },
  });
  return res.data.items?.map(mapIdea);
};
