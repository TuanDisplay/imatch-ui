import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface IChildNode {
  children: ReactNode;
}

export interface TSetState {
  setState: Dispatch<SetStateAction<boolean>>;
}

export interface IPostForm {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  isRequire: boolean;
}

type TCardType = 'exchange' | 'problem' | 'expert';
export interface ICard {
  id?: string;
  type?: TCardType;
  imageUrl: string;
  catValue?: string;
  title?: string;
  desc?: string;
  author?: string;
  views?: number;
  publishDate?: string;
  price?: number;
  submission?: number;
  consultCount?: number;
  rate?: number;
}

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

export interface IIdeaDetail extends IIdeaCard {
  price: number;
  benefitValue: string;
  image: string[];
}

export interface IProblemCard {
  id: string;
  imageUrl: string;
  catValue: string;
  desc: string;
  publishDate: string;
  title: string;
  price: number;
  submission: number;
}

export interface IProblemDetail extends IProblemCard {
  author: string;
  benefitValue: string;
  image: string[];
}

export interface IExpertCard {
  id: string;
  imageUrl: string;
  author: string;
  catValue: string;
  desc: string;
  views: number;
  consultCount: number;
  rate: number;
}

export interface IExpertDetail {
  email: string;
  achievements: string[];
}

// Interface Api Data of Backend
export interface IIdeaListApi {
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
