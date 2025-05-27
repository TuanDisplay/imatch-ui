import { Search } from 'lucide-react';

type FilterProps = {
  placeholder: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
};

const priceRangeList = [
  { id: 5, priceRange: 'Tất cả mức giá', value: '' },
  { id: 1, priceRange: 'Dưới 1 triệu', value: 'tier1' },
  { id: 2, priceRange: 'Từ 1 - 3 triệu', value: 'tier2' },
  { id: 3, priceRange: 'Từ 3 - 5 triệu', value: 'tier3' },
  { id: 4, priceRange: 'Trên 5 triệu', value: 'tier4' },
];

export default function FilterBar({
  placeholder,
  searchValue,
  setSearchValue,
  priceRange,
  setPriceRange
}: FilterProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
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
