export interface IIdeaCard {
  id: string;
  imageUrl: string;
  catValue: string;
  publishDate: string;
  author: string;
  desc: string;
  title: string;
  views: number;
}

export interface IIdeaDe extends IIdeaCard {
  price: number;
  benefitValue: string;
  image: string[];
  imageIP: string;
  isIP: number; 
}

export interface IIdeaApi {
  uuid: string;
  customer_name: string;
  ideasname: string;
  industry: string;
  image: string[];
  content_detail: string;
  price: number;
  post_day: string;
  view: number;
}

export interface IIdeaDeApi extends IIdeaApi {
  customer_email: string;
  is_procedure: string;
  image_intellect: string;
  value_benefits: string;
  is_intellect: number;
}
