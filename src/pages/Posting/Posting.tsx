import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '~/components/Button';
import {
  TextField,
  SelectField,
  EditorField,
  UploadImageField,
} from './FormItem';
import toast from 'react-hot-toast';

import * as ideaService from '~/services/idea.service';
import * as problemService from '~/services/problem.service';
import { MajorCat } from '~/common/data';
import { TPostFormSchema, postFormSchema } from '~/common/schema';
import { useNavigate } from 'react-router-dom';

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TPostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: TPostFormSchema) => {
    try {
      if (data.methodSelect === 'posting-idea') {
        await ideaService.postIdeas(data);
      } else {
        await problemService.postProblem(data);
      }
      reset();
      navigate('/');
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
              label="Tên sản phẩm"
              placeholder="Vui lòng tóm tắt tiêu đề ngắn gọn, dễ hiểu"
              isRequire
              register={register('title')}
              error={errors.title?.message}
            />

            <TextField
              id="price"
              label="Giá sản phẩm (VND)"
              placeholder="Vui lòng nhập số tiền sản phẩm"
              type="number"
              isRequire
              register={register('price', { valueAsNumber: true })}
              error={errors.price?.message}
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
                  error={errors.descTxtEdit?.message}
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
                  error={errors.valueTxtEdit?.message}
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
                  subtitle="Vui lòng cung cấp 3 hình ảnh liên quan đến ý tưởng."
                  isRequire
                  imgError={errors.relatedImgUpload?.message}
                  name="relatedImgUpload"
                  setValue={setValue}
                />
              )}
            />
          </div>
          <Button
            className="py-2 font-bold uppercase"
            type="submit"
            primary
            disable={isSubmitting}
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng sản phẩm'}
          </Button>
        </form>
      </div>
    </div>
  );
}
