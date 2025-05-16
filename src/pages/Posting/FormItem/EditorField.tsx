import ReactQuill from 'react-quill-new';
import { IPostForm } from '~/common/types';
import 'react-quill-new/dist/quill.snow.css';

import 'quill/dist/quill.snow.css';

interface IEditorField extends IPostForm {
  value: string;
  setValue: (value: string) => void;
  error: string | undefined;
}

export default function EditorField({
  label,
  value,
  setValue,
  placeholder = 'Nhập nội dung...',
  isRequire,
  error,
}: IEditorField) {
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'list',
    'indent',
    'align',
    'direction',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="flex flex-col gap-3">
      <label className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <div className="overflow-hidden rounded-xl bg-white drop-shadow-xl">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          className="h-[300px]"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
