import { Dispatch, SetStateAction, ReactNode } from 'react';
import { z } from 'zod';

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

export interface ICard {
  id?: number;
  imageUrl: string;
  category: string;
  title: string;
  desc?: string;
  author?: string;
  views?: number;
  publishDate: string;
  award?: number;
  submission?: number;
}

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TSelectedSchema = z.infer<typeof selectedSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email không được để trống')
    .email('Email không đúng định dạng')
    .refine((val) => !val.includes(' '), {
      message: 'Email không được chứa khoảng trắng',
    }),

  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(32, 'Mật khẩu quá dài')
    .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
    .refine((val) => !val.includes(' '), {
      message: 'Mật khẩu không được chứa khoảng trắng',
    }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Tên phải từ 3 ký tự' })
    .max(15, { message: 'Tên không được quá 15 ký tự' })
    .regex(/^[a-zA-Z0-9]+$/, 'Tên chỉ được chứa chữ và số'),

  email: z
    .string()
    .nonempty('Email không được để trống')
    .email('Email không đúng định dạng')
    .refine((val) => !val.includes(' '), {
      message: 'Email không được chứa khoảng trắng',
    }),

  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(32, 'Mật khẩu quá dài')
    .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
    .refine((val) => !val.includes(' '), {
      message: 'Mật khẩu không được chứa khoảng trắng',
    }),
});

export const selectedSchema = z.object({
  selected: z.string().min(1, 'Vui lòng chọn danh mục'),
});
