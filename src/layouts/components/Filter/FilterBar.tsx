import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import useDebounce from '~/hooks/useDebounce';

type FilterProps<T> = {
  data: T[];
  onFiltered: (filtered: T[]) => void;
};

const priceRangeList = [
  { id: 1, priceRange: 'Dưới 1 triệu', value: 'tier1' },
  { id: 2, priceRange: 'Từ 1 - 3 triệu', value: 'tier2' },
  { id: 3, priceRange: 'Từ 3 - 5 triệu', value: 'tier3' },
  { id: 4, priceRange: 'Trên 5 triệu', value: 'tier4' },
];

const dayRangeList = [
  { id: 1, dayRange: 'Hôm nay', value: 'tierd1' },
  { id: 2, dayRange: 'Sau một ngày', value: 'tierd2' },
  { id: 3, dayRange: 'Sau một tuần', value: 'tierd3' },
  { id: 4, dayRange: 'Sau một tháng', value: 'tierd4' },
];

export default function FilterBar<T>({ data, onFiltered }: FilterProps<T>) {
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const deboundcedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const dataFilter = data.filter((item: any) => {
      const matchesKeyword = item.title
        .toLowerCase()
        .includes(deboundcedValue.toLowerCase());

      let matchesPrice = true;
      if (priceRange === 'tier1') matchesPrice = item.price <= 1000000;
      else if (priceRange === 'tier2')
        matchesPrice = item.price > 1000000 && item.price <= 3000000;
      else if (priceRange === 'tier3')
        matchesPrice = item.price > 3000000 && item.price <= 5000000;

      return matchesKeyword && matchesPrice;
    });
    onFiltered(dataFilter);
  }, [deboundcedValue, data, priceRange, onFiltered]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceRange(value);
  };

  return (
    <div className="mb-4 flex flex-col items-start gap-4 rounded-xl bg-white p-2 shadow-sm md:flex-row md:items-center">
      <div className="flex w-full items-center rounded-lg border border-gray-300 md:w-1/2">
        <input
          type="text"
          placeholder="Tìm kiếm ý tưởng..."
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
        <option value="" hidden>
          --- Lọc theo giá tiền ---
        </option>
        {priceRangeList.map((priceRange) => {
          return (
            <option key={priceRange.id} value={priceRange.value}>
              {priceRange.priceRange} (VND)
            </option>
          );
        })}
      </select>
      <select
        value={priceRange}
        onChange={handlePriceChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 md:w-[220px]"
      >
        <option value="" hidden>
          --- Lọc theo ngày ---
        </option>
        {dayRangeList.map((dayRange) => {
          return (
            <option key={dayRange.id} value={dayRange.value}>
              {dayRange.dayRange}
            </option>
          );
        })}
      </select>
    </div>
  );
}
