export interface IExpCard {
  id: string;
  imageUrl: string;
  author: string;
  mainMajor: string;
  desc: string;
  views: number;
  consultCount: number;
  rate: number;
}

export interface IExpDe extends IExpCard {
  email: string;
  achievements: string[];
  majors: string[];
  total_rating: number;
}

export interface IExpApi {
  uuid: string;
  expertname: string;
  introduce: string;
  image: string;
  industry: string[];
  view: number;
  consultation: number;
  rating: number;
  avg_rating: number;
}

export interface IExpDeApi extends IExpApi {
  password: string;
  email: string;
  achievement: string[];
  total_rating: number;
}

export interface IExpPageApi {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: IExpApi[];
}
