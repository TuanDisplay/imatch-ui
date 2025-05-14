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
  placeholder?: string;
  isRequire: boolean;
}

type TCardType = 'exchange' | 'problem' | 'expert';
export interface ICard {
  id?: number;
  type?: TCardType;
  imageUrl: string;
  category?: string;
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
  id: number;
  imageUrl: string;
  category: string;
  catValue: string;
  publishDate: string;
  author: string;
  desc: string;
  title: string;
  benefitValue: string;
  price: number;
  views: number;
  image: string[];
}

export interface IProblemCard {
    id: number;
    imageUrl: string;
    category: string;
    catValue: string;
    author: string;
    desc: string;
    publishDate: string;
    title: string;
    price: number;
    benefitValue: string;
    submission: number;
    image: string[];
}

export interface IExpertCard {
  id: number;
  imageUrl: string;
  category: string;
  author: string;
  catValue: string;
  desc: string;
  publishDate: string;
  views: number;
  consultCount: number;
  rate: number;
  achievements: string[];
}
// export type TSelectedSchema = z.infer<typeof selectedSchema>;

// export const loginSchema = z.object({
//   email: z
//     .string()
//     .nonempty('Email không được để trống')
//     .email('Email không đúng định dạng')
//     .refine((val) => !val.includes(' '), {
//       message: 'Email không được chứa khoảng trắng',
//     }),

//   password: z
//     .string()
//     .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
//     .max(32, 'Mật khẩu quá dài')
//     .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
//     .refine((val) => !val.includes(' '), {
//       message: 'Mật khẩu không được chứa khoảng trắng',
//     }),
// });

// export const registerSchema = z.object({
//   fullName: z
//     .string()
//     .min(3, { message: 'Tên phải từ 3 ký tự' })
//     .max(15, { message: 'Tên không được quá 15 ký tự' }),

//   email: z
//     .string()
//     .nonempty('Email không được để trống')
//     .email('Email không đúng định dạng')
//     .refine((val) => !val.includes(' '), {
//       message: 'Email không được chứa khoảng trắng',
//     }),

//   password: z
//     .string()
//     .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
//     .max(32, 'Mật khẩu quá dài')
//     .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
//     .refine((val) => !val.includes(' '), {
//       message: 'Mật khẩu không được chứa khoảng trắng',
//     }),

//   code: z
//     .string()
//     .regex(/^\d{6}$/, {
//       message: 'Phải là 6 chữ số',
//     })
//     .refine((val) => !val.includes(' '), {
//       message: 'Mật khẩu không được chứa khoảng trắng',
//     }),
// });

// export const selectedSchema = z.object({
//   selected: z.string().min(1, 'Vui lòng chọn danh mục'),
// });
