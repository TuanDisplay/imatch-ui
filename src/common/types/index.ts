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

type TPost = 'ideas' | 'problem';
export interface IFavApi {
  uuid: string;
  post_uuid: string;
  post_type: TPost;
}