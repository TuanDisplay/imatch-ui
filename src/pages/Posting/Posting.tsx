import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '~/components/Button';
import {
  TextField,
  SelectField,
  EditorField,
  UploadImageField,
} from './FormItem';
import { MajorCat } from '~/common/data';
import { TPostFormSchema, postFormSchema } from '~/common/schema';
import toast from 'react-hot-toast';

const methodO = [
  { value: 'posting-idea', name: 'Mua - Bán ý tưởng' },
  { value: 'solving-problem', name: 'Đặt vấn đề' },
];

export default function Posting() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TPostFormSchema>({ resolver: zodResolver(postFormSchema) });

  const onSubmit = (data: TPostFormSchema) => {
    try {
      const dataInput = {
        title: data.title,
        majorValue: data.majorSelect,
        methodValue: data.methodSelect,
        descTxtArea: data.descTxtEdit,
        valueTextArea: data.valueTxtEdit,
        isIP: data.ipRadio,
        fname: data.fname,
        email: data.email,
        phone: data.phone,
        ipImg: data.ipImgUpload,
        relatedImg: data.relatedImgUpload,
        relatedImg2: data.relatedImgUpload2,
        relatedImg3: data.relatedImgUpload3,
      };
      console.log('Data: ' + JSON.stringify(dataInput));
      toast.success('Đăng thành công');
    } catch (err) {
      toast.error('Lỗi đăng');
      console.log(err);
    }
  };
  return (
    <div>
      <div className="relative flex justify-center">
        <img
          src="/banner/post-banner.jpg"
          alt="post-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 translate-y-[-50%] max-md:hidden">
          <h2 className="bg-primary p-2 text-4xl font-bold text-white uppercase">
            ĐĂNG Ý TƯỞNG
          </h2>
        </div>
      </div>
      <div className="container mx-auto py-10 lg:max-w-[1100px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <h2 className="text-skyBlue-900 mt-10 text-center text-4xl font-bold">
            Vui lòng nhập đầy đủ các thông tin dưới đây
          </h2>
          <div className="mt-10 space-y-10">
            <TextField
              id="topic-name"
              label="Tên ý tưởng"
              placeholder="Vui lòng tóm tắt tiêu đề ngắn gọn, dễ hiểu"
              isRequire
              register={register('title')}
              error={errors.title?.message}
            />

            <SelectField
              id="major"
              label="Lĩnh vực ngành"
              optionData={MajorCat}
              isRequire
              register={register('majorSelect')}
              error={errors.majorSelect?.message}
            />

            <SelectField
              id="method"
              label="Phương thức"
              optionData={methodO}
              isRequire
              register={register('methodSelect')}
              error={errors.methodSelect?.message}
            />

            <Controller
              name="descTxtEdit"
              control={control}
              render={({ field }) => (
                <EditorField
                  label="Nội dung chi tiết"
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="Giới thiệu về sản phẩm, từ những vấn đề nào để dẫn đến ý tưởng này..."
                  isRequire
                />
              )}
            />

            <Controller
              name="valueTxtEdit"
              control={control}
              render={({ field }) => (
                <EditorField
                  label="Giá trị - Lợi ích"
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="Trình bày các lợi ích mang lại từ sản phẩm để thu hút người dùng..."
                  isRequire
                />
              )}
            />

            <Controller
              name="ipImgUpload"
              control={control}
              render={({ field }) => (
                <UploadImageField
                  id={field.name}
                  label="Bạn đã đăng ký quyền sở hữu trí tuệ cho ý tưởng này chưa?"
                  subtitle="Vui lòng cung cấp hình ảnh lên nếu như bạn đã đăng ký quyền sở
              hữu trí tuệ cho ý tưởng này."
                  isRequire
                  radioRegis={register('ipRadio')}
                  imgError={errors.ipImgUpload?.message}
                  radioError={errors.ipRadio?.message}
                  name={field.name}
                  setValue={setValue}
                />
              )}
            />

            <Controller
              name="relatedImgUpload"
              control={control}
              render={({ field }) => (
                <UploadImageField
                  id={field.name}
                  label="Hình Ảnh"
                  subtitle="Vui lòng cung cấp 2 hình ảnh liên quan đến ý tưởng."
                  isRequire
                  imgError={errors.relatedImgUpload?.message}
                  name="relatedImgUpload"
                  setValue={setValue}
                />
              )}
            />
          </div>
          <div className="mt-5">
            <h3 className="text-skyBlue-900 text-3xl font-bold">
              Thông tin liên hệ
            </h3>
            <div className="mt-10 space-y-10">
              <TextField
                id="full-name"
                label="Họ và tên"
                placeholder="Nhập họ và tên của bạn"
                isRequire
                register={register('fname')}
                error={errors.fname?.message}
              />

              <TextField
                id="email"
                label="Email"
                placeholder="Email của bạn"
                isRequire
                register={register('email')}
                error={errors.email?.message}
              />

              <TextField
                id="phone-number"
                label="Số điện thoại"
                placeholder="Số điện thoại của bạn"
                isRequire
                register={register('phone')}
                error={errors.phone?.message}
              />
            </div>
          </div>
          <Button
            className="px-3 py-2 font-bold uppercase"
            type="submit"
            primary
          >
            Đăng ý tưởng
          </Button>
        </form>
      </div>
    </div>
  );
}
