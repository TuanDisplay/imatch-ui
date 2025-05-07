import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import {
  TextField,
  SelectField,
  EditorField,
  UploadImageField,
} from './FormItem';
import { MajorCat } from '~/common/data';

const majorO = [
  { id: 77, value: '', name: 'Chọn lĩnh vực ngành' },
  ...MajorCat,
];

const methodO = [
  { value: '', name: 'Chọn phương thức' },
  { value: 'posting-idea', name: 'Mua - Bán ý tưởng' },
  { value: 'solving-problem', name: 'Đặt vấn đề' },
];

export default function Posting() {
  const { handleSubmit } = useForm({});

  const onSubmit = () => {
    alert('Submit thanh cong');
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
          <h2 className="bg-primary p-2 text-4xl font-bold text-white">
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
            />

            <SelectField
              id="major"
              label="Lĩnh vực ngành"
              optionData={majorO}
              isRequire
            />

            <SelectField
              id="method"
              label="Phương thức"
              optionData={methodO}
              isRequire
            />

            <EditorField
              label="Nội dung chi tiết"
              placeholder="Giới thiệu về sản phẩm, từ những vấn đề nào để dẫn đến ý tưởng này..."
              isRequire
            />

            <EditorField
              label="Giá trị và lợi ích"
              placeholder="Giá trị và lợi ích của sản phẩm mang lại là gì?"
              isRequire
            />

            <UploadImageField
              label="Bạn đã đăng ký quyền sở hữu trí tuệ cho ý tưởng này chưa?"
              subtitle="Vui lòng cung cấp hình ảnh lên nếu như bạn đã đăng ký quyền sở
              hữu trí tuệ cho ý tưởng này."
              isSelectRadio={true}
              isRequire
            />

            <UploadImageField
              label="Hình Ảnh"
              subtitle="Vui lòng cung cấp 2 hình ảnh liên quan đến ý tưởng."
              isSelectRadio={false}
              isRequire
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
              />
              <TextField
                id="email"
                label="Email"
                placeholder="Email của bạn"
                isRequire
              />
              <TextField
                id="phone-number"
                label="Số điện thoại"
                placeholder="Số điện thoại của bạn"
                isRequire
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
