export interface IProCard {
  id: string;
  imageUrl: string;
  catValue: string;
  desc: string;
  publishDate: string;
  title: string;
  price: number;
  submission?: number;
}

export interface IProDetail extends IProCard {
  author: string;
  benefitValue: string;
  image: string[];
  imageIP: string;
  isIP: number;
}

export interface IProApi {
  uuid: string;
  customer_name: string;
  problemname: string;
  industry: string;
  image: string[];
  content_detail: string;
  price: number;
  post_day: string;
  view: number;
}
export interface IProDeApi extends IProApi {
  customer_email: string;
  is_procedure: string;
  image_intellect: string;
  value_benefits: string;
  is_intellect: number;
}
