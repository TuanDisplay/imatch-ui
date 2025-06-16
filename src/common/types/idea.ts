export interface IIdeaCard {
  id: string;
  imageUrl: string;
  catValue: string;
  publishDate: string;
  author: string;
  desc: string;
  title: string;
  views: number;
  innerRef?: any;
}

export interface IIdeaDe extends IIdeaCard {
  customer_id: string;
  price: number;
  benefitValue: string;
  image: string[];
  imageIP: string;
  isIP: number;
  isActive: number;
  isDelete: number;
}

export interface IIdeaApi {
  uuid: string;
  customer_name: string;
  ideasname: string;
  industry: string;
  image: string;
  content_detail: string;
  price: number;
  post_day: string;
  view: number;
}

export interface IIdeaDeApi {
  uuid: string;
  customer_name: string;
  ideasname: string;
  industry: string;
  content_detail: string;
  price: number;
  post_day: string;
  view: number;
  customer_email: string;
  customeruuid: string;
  is_procedure: string;
  image: string[];
  image_intellect: string;
  value_benefits: string;
  is_intellect: number;
  is_active: number;
  is_delete: number;
}

export interface IIdeaPageApi {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: IIdeaApi[];
}

// Interface Favorite
export interface IIdeaFavCard extends IIdeaCard {
  post_id: string;
}
export interface IIdeaFavApi extends IIdeaApi {
  post_uuid: string;
}
