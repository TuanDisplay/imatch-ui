import clsx from 'clsx';
import { useState } from 'react';
import { ICard } from '~/common/types';

interface ICatBar {
  CatItems: ICatItem[];
  data: ICard[];
  setData: any;
}

interface ICatItem {
  id: number;
  name: string;
  value: string;
}

export default function CatBar({ CatItems, data, setData }: ICatBar) {
  const [selected, setSelected] = useState('');

  const filterHandle = (value: string) => {
    setSelected(value);
    const newData = data.filter((item) => item.catValue === value);
    setData(newData);
  };

  const filterAllHandle = () => {
    setSelected('');
    setData(data);
  };

  return (
    <aside className="h-fit w-64 rounded-xl bg-white p-4 shadow-lg">
      <div
        className="bg-primary mb-4 cursor-pointer rounded-md py-2 text-center font-semibold text-white"
        onClick={filterAllHandle}
      >
        Danh Mục
      </div>
      <ul className="space-y-1">
        {CatItems.map((cat, index) => (
          <li
            key={index}
            className={clsx(
              'cursor-pointer rounded-md border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors last:border-b-0 hover:bg-orange-100 hover:text-orange-600',
              {
                'bg-orange-100 text-orange-600': selected === cat.value,
              },
            )}
            onClick={() => filterHandle(cat.value)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
