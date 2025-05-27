import clsx from 'clsx';

interface ICatBar {
  CatItems: ICatItem[];
  catValue: string; 
  setCatValue: React.Dispatch<React.SetStateAction<string>>;
}

interface ICatItem {
  id: number;
  name: string;
  value: string;
}

export default function CatBar({
  CatItems,
  catValue,
  setCatValue,
}: ICatBar) {

  const filterHandle = (value: string) => {
    setCatValue(value);
  };

  const filterAllHandle = () => {
    setCatValue('');
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
                'bg-orange-100 text-orange-600': catValue === cat.value,
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
