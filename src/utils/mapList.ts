import { IIdeaListApi, IIdeaListDetailApi } from '~/common/types';

export const mapIdeaList = (raw: IIdeaListApi) => {
  return {
    id: raw.uuid,
    author: raw.customer_name,
    title: raw.ideasname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    publishDate: raw.post_day,
    views: raw.view,
    price: raw.price,
  };
};

export const mapIdeaDetailList = (raw: IIdeaListDetailApi) => {
  return {
    author: raw.customer_name,
    title: raw.ideasname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    views: raw.view,
    price: raw.price,
    benefitValue: raw.value_benefits,
    image: raw.image,
  };
};
