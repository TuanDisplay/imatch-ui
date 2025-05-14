import { UseFormRegisterReturn } from 'react-hook-form';
import { IPostForm } from '~/common/types';

interface ISelectInput extends IPostForm {
  optionData: IOptionData[];
  register: UseFormRegisterReturn;
  error: string | undefined;
}

interface IOptionData {
  value: string;
  name: string;
}

export default function SelectInput({
  id,
  label,
  isRequire,
  optionData,
  register,
  error,
}: ISelectInput) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <div className="rounded-xl bg-white px-4 py-2.5 drop-shadow-xl">
        <select id={id} {...register} className="w-full outline-0">
          <option value="" hidden>
            --- Chọn danh mục ---
          </option>
          {optionData.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
