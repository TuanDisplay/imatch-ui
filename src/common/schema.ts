import { z } from 'zod';
// import { isAfter, addDays, startOfDay } from 'date-fns';

const reqText = (message: string) => z.string().trim().nonempty(message);
const reqSelect = (message: string) => z.string().trim().nonempty(message);
const reqTextArea = (message: string) => z.string().trim().nonempty(message);
const reqImgUpload = (message: string) => z.string().trim().nonempty(message);

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TPostFormSchema = z.infer<typeof postFormSchema>;
export type TBookingSchema = z.infer<typeof bookingFormSchema>;
export type TMessageSchema = z.infer<typeof messageFormSchema>;
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

  code: z.string().optional(),
  // .regex(/^\d{6}$/, {
  //   message: 'Mã xác nhận không hợp',
  // })
  // .refine((val) => !val.includes(' '), {
  //   message: 'Mã xác nhận không được chứa khoảng trắng',
  // }),
});

export const postFormSchema = z
  .object({
    title: reqText('Không được để trống'),
    price: z
      .number({
        required_error: 'Vui lòng nhập số tiền',
        invalid_type_error: 'Số tiền không hợp lệ',
      })
      .min(0, { message: 'Số tiền phải lớn hơn hoặc bằng 0' }),

    descTxtEdit: reqTextArea('Không được để trống'),
    valueTxtEdit: reqTextArea('Không được để trống'),

    majorSelect: reqSelect('Vui lòng chọn danh mục'),
    methodSelect: reqSelect('Vui lòng chọn danh mục'),

    ipRadio: z.enum(['0', '1'], {
      required_error: 'Vui lòng chọn một tùy chọn.',
    }),

    ipImgUpload: z.any(),
    relatedImgUpload: reqImgUpload('Không được để trống ảnh'),
    relatedImgUpload2: reqImgUpload('Không được để trống ảnh'),
    relatedImgUpload3: reqImgUpload('Không được để trống ảnh'),
  })
  .superRefine((data, ctx) => {
    if (
      data.ipRadio === '1' &&
      (!data.ipImgUpload || data.ipImgUpload.length === 0)
    ) {
      ctx.addIssue({
        path: ['ipImgUpload'],
        code: z.ZodIssueCode.custom,
        message: 'Không được để trống ảnh',
      });
    }
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

export const messageFormSchema = z.object({
  title: z.string().trim().nonempty('Không được để trống'),
  content: z.string().trim().nonempty('Không được để trống'),
});

export const profileSchema = z.object({
  avatar: z.string().optional(),
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
