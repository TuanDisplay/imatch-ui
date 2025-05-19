import { IProApi, IProDeApi } from "~/common/types/problem";

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
  };
};

export const mapProDe = (raw: IProDeApi) => {
  return {
    author: raw.customer_name,
    title: raw.problemname,
    catValue: raw.industry,
    imageUrl: raw.image[0],
    desc: raw.content_detail,
    views: raw.view,
    price: raw.price,
    benefitValue: raw.value_benefits,
    image: raw.image,
  };
};