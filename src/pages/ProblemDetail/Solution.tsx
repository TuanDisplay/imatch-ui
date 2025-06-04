import { useMemo, useState } from 'react';
import { ISolutionApi } from '~/common/types/problem';
import Button from '~/components/Button';
import { WrapperContent } from '~/components/Content';
import Overview from '~/components/Overview';
import PaginationBar from '~/components/PaginationBar';
import { useSolution } from '~/hooks/ApiQuery/useProblemQuery';
import { convertIsoDate, convertStringToHtml } from '~/utils/files';

export default function Solution({ problem_id }: { problem_id: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error, refetch } = useSolution(problem_id, {
    page: currentPage,
  });

  const dataItems: ISolutionApi[] = useMemo(() => {
    return data?.items ? data.items : [];
  }, [data]);
  return (
    <div className="w-full bg-slate-100 pt-16 pb-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="w-full rounded-2xl bg-white px-5 py-10">
          <div className="flex flex-col items-center">
            <h2 className="border-b-primary w-fit border-b-4 px-3 py-2 text-3xl font-bold uppercase">
              Giải pháp
            </h2>
            {dataItems.length === 0 ? (
              <div className="text-center">Không có dữ liệu</div>
            ) : (
              <WrapperContent
                isLoading={isLoading}
                error={error}
                refetch={refetch}
                className="!h-[60vh]"
              >
                <div className="grid grid-cols-1 gap-6 p-6">
                  {dataItems.map((item) => {
                    return (
                      <Overview
                        key={item.uuid}
                        title={item.title_solution}
                        icon="📰"
                      >
                        <div
                          className="leading-relaxed whitespace-pre-line text-gray-700"
                          dangerouslySetInnerHTML={convertStringToHtml(
                            item.content,
                          )}
                        ></div>
                        <div className="flex justify-between">
                          <div className="flex gap-10">
                            <div className="space-x-3">
                              <span className="font-bold">Tác giả:</span>
                              <span className="capitalize">
                                {item.customer_name}
                              </span>
                            </div>
                            <div className="space-x-3">
                              <span className="font-bold">Ngày đăng:</span>
                              <span>{convertIsoDate(item.created_at)}</span>
                            </div>
                          </div>

                          <Button
                            className="rounded-lg px-3 py-2 font-bold"
                            accept
                          >
                            Duyệt giải pháp
                          </Button>
                        </div>
                      </Overview>
                    );
                  })}
                </div>
              </WrapperContent>
            )}
          </div>
          {dataItems.length > 0 && (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={data?.total ? data?.total : 0}
              itemsPerPage={data?.limit ? data?.limit : 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
