import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce';

type FilterProps = {
  dataReal: object[];
  setDataFilter: any;
  placeholder: string;
};

const priceRangeList = [
  { id: 5, priceRange: 'Tất cả mức giá', value: 'tier0' },
  { id: 1, priceRange: 'Dưới 1 triệu', value: 'tier1' },
  { id: 2, priceRange: 'Từ 1 - 3 triệu', value: 'tier2' },
  { id: 3, priceRange: 'Từ 3 - 5 triệu', value: 'tier3' },
  { id: 4, priceRange: 'Trên 5 triệu', value: 'tier4' },
];

export default function FilterBar({ dataReal, setDataFilter, placeholder }: FilterProps) {
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState('tier0');

  const debouncedSearch = useDebounce(searchValue, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceRange(value);
  };

  useEffect(() => {
    const filtered = dataReal.filter((item: any) => {
      const matchesKeyword = item.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      let matchesPrice = true;
      switch (priceRange) {
        case 'tier1':
          matchesPrice = item.price <= 1000000;
          break;
        case 'tier2':
          matchesPrice = item.price > 1000000 && item.price <= 3000000;
          break;
        case 'tier3':
          matchesPrice = item.price > 3000000 && item.price <= 5000000;
          break;
        case 'tier4':
          matchesPrice = item.price > 5000000;
          break;
        case 'tier0':
        default:
          matchesPrice = true;
          break;
      }

      return matchesKeyword && matchesPrice;
    });

    setDataFilter(filtered);
  }, [dataReal, debouncedSearch, priceRange, setDataFilter]);

  return (
    <div className="mb-4 flex flex-col items-start gap-4 rounded-xl bg-white p-2 shadow-sm md:flex-row md:items-center">
      <div className="flex w-full items-center rounded-lg border border-gray-300 md:w-1/2">
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearch}
          className="flex-1 px-3 outline-0"
        />
        <div className="h-full p-2">
          <Search className="w-10" />
        </div>
      </div>

      <select
        value={priceRange}
        onChange={handlePriceChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 md:w-[220px]"
      >
        {priceRangeList.map((priceRange) => {
          return (
            <option key={priceRange.id} value={priceRange.value}>
              {priceRange.priceRange}
            </option>
          );
        })}
      </select>
    </div>
  );
}
