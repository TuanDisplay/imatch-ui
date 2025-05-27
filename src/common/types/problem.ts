export interface IProCard {
  id: string;
  imageUrl: string;
  catValue: string;
  desc: string;
  publishDate: string;
  title: string;
  price: number;
  submission?: number;
  innerRef?: any;
}

export interface IProDetail extends IProCard {
  customer_id: string;
  author: string;
  benefitValue: string;
  image: string[];
  imageIP: string;
  isIP: number;
}

export interface IProApi {
  uuid: string;
  customer_uuid: string;
  customer_name: string;
  problemname: string;
  industry: string;
  image: string[];
  content_detail: string;
  price: number;
  post_day: string;
  view: number;
  solution: number;
}
export interface IProDeApi extends IProApi {
  customer_email: string;
  is_procedure: string;
  image_intellect: string;
  value_benefits: string;
  is_intellect: number;
}

export interface IProProPageApi {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: IProApi[];
}

// Interface Favorite
export interface IProFavCard extends IProCard {
  post_id: string;
}
export interface IProFavApi extends IProApi {
  post_uuid: string;
}
