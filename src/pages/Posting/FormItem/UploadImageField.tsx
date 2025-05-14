import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import { IPostForm } from '~/common/types';
import { convertToBase64 } from '~/utils/files';

interface IUploadImageField extends IPostForm {
  id: string;
  subtitle: string;
  radioRegis?: UseFormRegisterReturn;
  imgError?: string | undefined;
  radioError?: string | undefined;
  name: string;
  setValue: UseFormSetValue<any>;
}

const YesNoRadio = ({ register }: { register: UseFormRegisterReturn }) => {
  return (
    <div className="ml-2 flex gap-6">
      <div className="space-x-2">
        <input type="radio" id="yes" value="yes" {...register} />
        <label htmlFor="yes">Đã có</label>
      </div>
      <div className="space-x-2">
        <input type="radio" id="no" value="no" {...register} />
        <label htmlFor="no">Chưa có</label>
      </div>
    </div>
  );
};

const UploadImage = ({
  id,
  name,
  setValue,
}: {
  id: string;
  name: string;
  setValue: UseFormSetValue<any>;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setValue(name, base64);
    }
  };

  return (
    <div className="w-[250px] rounded-xl bg-white px-5 py-4">
      <div className="rounded-xl border-1 border-dashed p-2">
        <label
          htmlFor={id}
          className="flex h-30 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl hover:bg-gray-50"
        >
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {image ? (
            <img src={image} alt="preview" className="object-cover" />
          ) : (
            <>
              <UploadCloud className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Tải lên</span>
            </>
          )}
        </label>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Kích thước tối đa: 10 MB.
      </div>
    </div>
  );
};

export default function UploadImageField({
  id,
  label,
  subtitle,
  isRequire,
  radioRegis,
  imgError,
  radioError,
  name,
  setValue,
}: IUploadImageField) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-skyBlue-900 text-xl font-bold">
        <label>{label}</label>
        {isRequire && <span className="text-red-500"> *</span>}
      </div>
      {radioRegis && <YesNoRadio register={radioRegis} />}
      <p className="text-gray-500">{subtitle}</p>
      <div className="flex gap-2">
        <UploadImage id={id} setValue={setValue} name={name} />
        {id === 'relatedImgUpload' && (
          <UploadImage
            id="relatedImgUpload2"
            setValue={setValue}
            name="relatedImgUpload2"
          />
        )}
        {id === 'relatedImgUpload' && (
          <UploadImage
            id="relatedImgUpload3"
            setValue={setValue}
            name="relatedImgUpload3"
          />
        )}
      </div>
      {imgError && <p className="text-xs text-red-500">{imgError}</p>}
      {radioError && <p className="text-xs text-red-500">{radioError}</p>}
    </div>
  );
}
