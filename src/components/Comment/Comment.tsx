import { Star } from 'lucide-react';
import { ICard } from '~/common/types';

export default function Comment({
  imageUrl,
  author,
  publishDate,
  desc,
}: ICard) {
  return (
    <div className="space-y-3 border-b-[1px] py-5 last:border-none">
      <div className="flex items-center gap-5">
        <img
          src={imageUrl}
          alt="avatar"
          className="h-8 w-8 rounded-full bg-cover"
        />
        <span className="">{author}</span>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-1">
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} fill="#ff6e00" stroke="none" />
          <Star size={16} stroke="#ff6e00" />
        </div>
        <span className="text-sm">{publishDate}</span>
      </div>
      <p>{desc}</p>
    </div>
  );
}
