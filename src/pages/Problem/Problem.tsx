import { useMemo, useState } from 'react';

import PaginationBar from '~/components/PaginationBar';
import { MajorCat } from '~/common/data';
import { ProblemItem } from './ProblemItems';
import { WrapperContent } from '~/components/Content';
import CatBar from '~/components/CatBar';
import FilterBar from '~/layouts/components/Filter';
import { useDebounce } from '~/hooks/useDebounce';
import { useProblem } from '~/hooks/ApiQuery/useProblemQuery';
import { mapPro } from '~/utils/map/problem';

export default function Solving() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [catValue, setCatValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: allData, isLoading } = useProblem({
    page: currentPage,
    industry: catValue,
    problemname: debouncedSearch,
    price_tier: priceRange,
  });

  const problemQuery = useProblem();

  const data = useMemo(() => {
    return allData?.items ? allData?.items.map(mapPro) : [];
  }, [allData?.items]);

  const dataReal = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src="/banner/problem-banner.jpg"
          alt="exchange-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Giải quyết vấn đề
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Không có gì là vấn đề – chỉ có giải pháp chờ được khám phá.
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-5">
        <div className="flex gap-6">
          <CatBar
            CatItems={MajorCat}
            catValue={catValue}
            setCatValue={setCatValue}
          />
          <div className="flex flex-1 flex-col px-4">
            <FilterBar
              placeholder="Tìm kiểm vấn đề..."
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
            <WrapperContent
              queryResultObject={problemQuery}
              isLoading={isLoading}
            >
              {dataReal.length === 0 ? (
                <div className="text-center">Không có dữ liệu</div>
              ) : (
                dataReal.map((item) => {
                  return (
                    <ProblemItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      catValue={item.catValue}
                      title={item.title}
                      desc={item.desc}
                      price={item.price}
                      submission={item.submission}
                      publishDate={item.publishDate}
                    />
                  );
                })
              )}
            </WrapperContent>

            {dataReal.length > 0 && (
              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={allData?.total ? allData?.total : 0}
                itemsPerPage={allData?.limit ? allData?.limit : 0}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
