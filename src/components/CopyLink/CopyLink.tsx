import { useState } from 'react';
import Link from '../Icons/Link';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Đã sao chép');
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div
      className={clsx('w-fit cursor-pointer rounded-sm bg-gray-500 p-1', {
        'opacity-50': copied,
      })}
      title="copy-link"
      onClick={handleCopy}
    >
      <Link />
    </div>
  );
}
