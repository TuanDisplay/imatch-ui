import { useQuill } from 'react-quilljs';
import { IPostForm } from '~/common/types';

import 'quill/dist/quill.snow.css';

export default function EditorField({
  label,
  placeholder: placeH,
  isRequire,
}: IPostForm) {
  const theme = 'snow';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
    ],

    clipboard: {
      matchVisual: false,
    },
  };

  const placeholder = placeH;

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    'video',
    'color',
    'background',
  ];

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  return (
    <div className="flex flex-col gap-3">
      <label className="text-skyBlue-900 text-xl font-bold">
        {label}
        {isRequire && <span className="text-red-500"> *</span>}
      </label>
      <div className="h-[300px] w-full overflow-hidden bg-white">
        <div ref={quillRef} />
      </div>
    </div>
  );
}
