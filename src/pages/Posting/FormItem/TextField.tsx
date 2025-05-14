import { UseFormRegisterReturn } from 'react-hook-form';
import { IPostForm } from '~/common/types';

interface TextInput extends IPostForm {
  register: UseFormRegisterReturn;
  error: string | undefined;
}

export default function TextInput({
  id,
  label,
  placeholder,
  isRequire = false,
  register,
  error,
}: TextInput) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        {...register}
        type="text"
        placeholder={placeholder}
        className="rounded-xl bg-white px-4 py-2.5 drop-shadow-xl"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
