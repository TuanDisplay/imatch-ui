import { IProApi, IProDeApi } from '~/common/types/problem';

export const mapPro = (raw: IProApi) => {
  return {
    id: raw.uuid,
    author: raw.customer_name,
    title: raw.problemname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    publishDate: raw.post_day,
    views: raw.view,
    price: raw.price,
    submission: raw.solution,
  };
};

export const mapProDe = (raw: IProDeApi) => {
  return {
    author: raw.customer_name,
    title: raw.problemname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    benefitValue: raw.value_benefits,
    views: raw.view,
    submission: raw.solution,
    price: raw.price,
    image: raw.image,
    imageIP: raw.image_intellect,
    isIP: raw.is_intellect,
  };
};
