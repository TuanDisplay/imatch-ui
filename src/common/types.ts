import { Dispatch, SetStateAction, ReactNode } from 'react';
import { z } from 'zod';

export interface ChildNode {
  children: ReactNode;
}

export interface TSetState {
  setState: Dispatch<SetStateAction<boolean>>;
}

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

export type TRegisterSchema = z.infer<typeof registerSchema>;
