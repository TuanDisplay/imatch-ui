import { IIdeaApi, IIdeaDeApi, IIdeaFavApi } from '~/common/types/idea';

export const mapIdea = (raw: IIdeaApi) => {
  return {
    id: raw.uuid,
    author: raw.customer_name,
    title: raw.ideasname,
    catValue: raw.industry,
    imageUrl: raw.image,
    desc: raw.content_detail,
    publishDate: raw.post_day,
    views: raw.view,
    price: raw.price,
  };
};

export const mapIdeaDe = (raw: IIdeaDeApi) => {
  return {
    customer_id: raw.customeruuid,
    author: raw.customer_name,
    title: raw.ideasname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    benefitValue: raw.value_benefits,
    views: raw.view,
    price: raw.price,
    image: raw.image,
    imageIP: raw.image_intellect,
    isIP: raw.is_intellect,
    publishDate: raw.post_day,
    isActive: raw.is_active,
    isDelete: raw.is_delete,
  };
};

export const mapIdeaFav = (raw: IIdeaFavApi) => {
  return {
    id: raw.uuid,
    post_id: raw.post_uuid,
    author: raw.customer_name,
    title: raw.ideasname,
    catValue: raw.industry,
    imageUrl: raw.image,
    desc: raw.content_detail,
    publishDate: raw.post_day,
    views: raw.view,
    price: raw.price,
  };
};
