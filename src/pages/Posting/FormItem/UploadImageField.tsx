import { UploadCloud } from 'lucide-react';
import { IPostForm } from '~/common/types';

interface IUploadImageField extends IPostForm {
  subtitle: string;
  isSelectRadio: boolean;
}

const UploadImage = () => {
  return (
    <div className="w-[300px] rounded-xl bg-white px-5 py-4">
      <div className="rounded-xl border-1 border-dashed">
        <label
          htmlFor="file-upload"
          className="flex h-30 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 hover:bg-gray-50"
        >
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <UploadCloud className="h-6 w-6 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Tải lên</span>
        </label>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Kích thước tối đa: 10 MB.
      </div>
    </div>
  );
};

const YesNoRadio = () => {
  return (
    <div className="ml-2 flex gap-6">
      <div className="space-x-2">
        <input type="radio" id="yes" name="intellectual-property" value="yes" />
        <label htmlFor="">Đã có</label>
      </div>
      <div className="space-x-2">
        <input type="radio" id="no" name="intellectual-property" value="no" />
        <label htmlFor="">Chưa có</label>
      </div>
    </div>
  );
};

export default function UploadImageField({
  label,
  subtitle,
  isRequire,
  isSelectRadio = false,
}: IUploadImageField) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-skyBlue-900 text-xl font-bold">
        <label>{label}</label>
        {isRequire && <span className="text-red-500"> *</span>}
      </div>
      {isSelectRadio && <YesNoRadio />}
      <p className="text-gray-500">{subtitle}</p>
      <UploadImage />
    </div>
  );
}
