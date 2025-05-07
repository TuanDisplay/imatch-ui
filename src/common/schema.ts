import { z } from 'zod';

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TSelectedSchema = z.infer<typeof postFormSchema>;

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
  fullName: z
    .string()
    .min(3, { message: 'Tên phải từ 3 ký tự' })
    .max(15, { message: 'Tên không được quá 15 ký tự' }),

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

  code: z
    .string()
    .regex(/^\d{6}$/, {
      message: 'Phải là 6 chữ số',
    })
    .refine((val) => !val.includes(' '), {
      message: 'Mật khẩu không được chứa khoảng trắng',
    }),
});

export const postFormSchema = z.object({
  text: z.string().trim().min(1, { message: 'Không được để trống' }),
  textArea: z.string().nonempty('Không được để trống'),
  selected: z.string().min(1, { message: 'Vui lòng chọn danh mục' }),
});
