import { IPostForm } from '~/common/types';
import { UseFormRegister } from 'react-hook-form';
import { TSelectedSchema } from '~/common/schema';

interface TextInput extends IPostForm {
  register: UseFormRegister<TSelectedSchema>;
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
        {...register('text')}
        type="text"
        placeholder={placeholder}
        className="rounded-xl bg-white px-4 py-2.5 drop-shadow-xl"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
