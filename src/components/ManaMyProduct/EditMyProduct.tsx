import clsx from 'clsx';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EditMyProduct({
  id,
  typeLink,
}: {
  id: string;
  typeLink: 'idea-edit' | 'problem-edit';
}) {
  return (
    <Link
      to={`/${typeLink}/${id}`}
      className={clsx(
        'group absolute top-0 right-0 mt-4.5 mr-10 cursor-pointer',
      )}
    >
      <Edit size={19} className="text-green-500" />
    </Link>
  );
}
