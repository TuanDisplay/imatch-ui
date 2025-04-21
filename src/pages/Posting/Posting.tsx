import { useForm } from 'react-hook-form';
import TextInput from './FormItem/TextInput';
import { SelectInput } from './FormItem';
import Button from '~/components/Button';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const majorO = [
  { value: '', name: 'Chọn lĩnh vực ngành' },
  { value: 'technology', name: 'Công nghệ' },
  { value: 'enviroment', name: 'Môi trường' },
  { value: 'agriulture', name: 'Nông nghiệp' },
];

const methodO = [
  { value: '', name: 'Chọn phương thức' },
  { value: 'posting-idea', name: 'Mua - Bán ý tưởng' },
  { value: 'solving-problem', name: 'Đặt vấn đề' },
];

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

export default function Posting() {
  const { handleSubmit } = useForm({});
  const theme = 'snow';
  // const theme = 'bubble';

  const modules = {
    toolbar: toolbarOptions,
  };

  const placeholder =
    'Giới thiệu về sản phẩm, từ những vấn đề nào để dẫn đến ý tưởng này...';

  // const formats = ['bold', 'italic', 'underline', 'strike', 'size'];

  const { quillRef: quillRef1 } = useQuill({ theme, modules, placeholder });
  const { quillRef: quillRef2 } = useQuill({ theme, modules, placeholder });

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
            <TextInput
              id="topic-name"
              label="Tên ý tưởng"
              placeholder="Vui lòng tóm tắt tiêu đề ngắn gọn, dễ hiểu"
              isRequire
            />

            <SelectInput
              id="major"
              label="Lĩnh vực ngành"
              optionData={majorO}
              isRequire
            />

            <SelectInput
              id="method"
              label="Phương thức"
              optionData={methodO}
              isRequire
            />

            <div className="flex flex-col gap-3">
              <label className="text-skyBlue-900 text-xl font-bold">
                Nội dung chi tiết
                <span className="text-red-500"> *</span>
              </label>
              <div className="h-[300px] overflow-hidden rounded-xl bg-white drop-shadow-xl">
                <div ref={quillRef1} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-skyBlue-900 text-xl font-bold">
                Giá trị và lợi ích
                <span className="text-red-500"> *</span>
              </label>
              <div className="h-[300px] overflow-hidden rounded-xl bg-white drop-shadow-xl">
                <div ref={quillRef2} />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-skyBlue-900 text-3xl font-bold">
              Thông tin liên hệ
            </h3>
            <div className="mt-10 space-y-10">
              <TextInput
                id="full-name"
                label="Họ và tên"
                placeholder="Nhập họ và tên của bạn"
                isRequire
              />
              <TextInput
                id="email"
                label="Email"
                placeholder="Email của bạn"
                isRequire
              />
              <TextInput
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
