import { z } from 'zod';
// import { isAfter, addDays, startOfDay } from 'date-fns';

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TSelectedSchema = z.infer<typeof postFormSchema>;
export type TBookingSchema = z.infer<typeof bookingFormSchema>;
export type TProfileSchema = z.infer<typeof profileSchema>;

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
    .max(32, 'Mật khẩu quá dài'),
});

export const registerSchema = z.object({
  fname: z
    .string()
    .trim()
    .nonempty('Không được để trống trường này')
    .refine((val) => /^[a-zA-ZÀ-ỹ\s]+$/.test(val), {
      message: 'Họ và tên không được chứa ký tự đặc biệt hoặc số',
    }),

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

export const bookingFormSchema = z.object({
  fname: z
    .string()
    .trim()
    .nonempty('Không được để trống trường này')
    .refine((val) => /^[a-zA-ZÀ-ỹ\s]+$/.test(val), {
      message: 'Họ và tên không được chứa ký tự đặc biệt hoặc số',
    }),
  date: z.string().min(1, 'Vui lòng chọn thời gian'),
  time: z
    .string()
    .min(1, 'Vui lòng chọn thời gian')
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Định dạng giờ không hợp lệ'),
});

export const profileSchema = z.object({
  fname: z
    .string()
    .trim()
    .nonempty('Không được để trống trường này')
    .refine((val) => /^[a-zA-ZÀ-ỹ\s]+$/.test(val), {
      message: 'Họ và tên không được chứa ký tự đặc biệt hoặc số',
    }),

  birthDate: z.string().nonempty('Không được để trống trường này'),
  bio: z.string().nonempty('Không được để trống trường này'),
});

// preprocess(
//     (val) => (typeof val === 'string' ? new Date(val) : val),
//     z
//       .date({
//         required_error: 'Vui lòng chọn ngày',
//         invalid_type_error: 'Ngày không hợp lệ',
//       })
//       .refine((date) => isAfter(startOfDay(date), addDays(new Date(), 0)), {
//         message: 'Ngày hẹn phải sau hôm nay',
//       }),
//   ),
