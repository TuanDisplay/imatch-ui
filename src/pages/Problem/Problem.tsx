import { useMemo, useState } from 'react';

import PaginationBar from '~/components/PaginationBar';
import { usePagination } from '~/hooks/usePagination';
import { MajorCat } from '~/common/data';
import { ProblemItem } from './ProblemItems';
import { WrapperContent } from '~/components/Content';
import CatBar from '~/components/CatBar';
import FilterBar from '~/layouts/components/Filter';
import { IProDetail } from '~/common/types/problem';
import { useProblem } from '~/hooks/ApiQuery/useProblemQuery';

export default function Solving() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataFilter, setDataFilter] = useState<IProDetail[]>([]);

  const itemsPerPage = 3;
  const currentItems = usePagination(dataFilter, currentPage, itemsPerPage);

  const { data } = useProblem();
  const problemQuery = useProblem();

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
          <CatBar CatItems={MajorCat} data={dataReal} setData={setDataFilter} />
          <div className="flex flex-1 flex-col px-4">
            <FilterBar
              dataReal={dataReal}
              setDataFilter={setDataFilter}
              placeholder='Tìm kiểm vấn đề...'
            ></FilterBar>
            <WrapperContent queryResultObject={problemQuery}>
              {dataFilter.length === 0 ? (
                <div className="text-center">Không có dữ liệu</div>
              ) : (
                currentItems.map((item) => {
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

            {dataFilter.length > 0 && (
              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={dataFilter.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
