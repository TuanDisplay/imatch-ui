import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema, TRegisterSchema } from '~/common/types';

interface ISelectInput {
  id: string;
  label: string;
  isRequire: boolean;
  optionData: IOptionData[];
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
}: ISelectInput) {
  const {
    register,
    formState: { errors },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <div className="rounded-xl bg-white px-4 py-2.5 drop-shadow-xl">
        <select id={id} {...register('selected')} className="w-full outline-0">
          {optionData.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      {errors.selected && (
        <p className="text-xs text-red-500">{errors.selected.message}</p>
      )}
    </div>
  );
}
