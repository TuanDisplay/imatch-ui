interface ITextInput {
  id: string;
  label: string;
  placeholder: string;
  isRequire: boolean;
}

export default function TextInput({
  id,
  label,
  placeholder,
  isRequire = false,
}: ITextInput) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="rounded-xl bg-white px-4 py-2.5 drop-shadow-xl"
      />
      
    </div>
  );
}
