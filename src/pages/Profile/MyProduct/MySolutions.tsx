import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { IMySolutionApi } from '~/common/types/problem';
import LoadingAni from '~/components/Animation/LoadingAni';
import Button from '~/components/Button';
import { WrapperContent } from '~/components/Content';
import Overview from '~/components/Overview';

import { useMySolutionScroll } from '~/hooks/ApiQuery/useProblemQuery';
import { convertIsoDate, convertStringToHtml } from '~/utils/files';

export default function MySolutions() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMySolutionScroll();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <WrapperContent
      error={error}
      refetch={refetch}
      isLoading={isLoading}
      className="!h-[50vh] px-10"
    >
      {data?.pages.every((page) => Array.isArray(page) && page.length === 0) ? (
        <div className="text-center">Không có dữ liệu</div>
      ) : (
        <>
          {data?.pages.map((page: IMySolutionApi[]) => {
            return page?.map((item: IMySolutionApi, index) => {
              const isLast = page.length === index + 1 && page.length > 2;
              return (
                <Overview key={item.uuid} title={item.title_solution} icon="📰">
                  <div
                    className="leading-relaxed whitespace-pre-line text-gray-700"
                    dangerouslySetInnerHTML={convertStringToHtml(item.content)}
                  ></div>
                  <div
                    ref={isLast ? ref : null}
                    className="flex justify-between"
                  >
                    <div className="space-x-3">
                      <span className="font-bold">Ngày đăng:</span>
                      <span>{convertIsoDate(item.created_at)}</span>
                    </div>

                    <Button
                      to={`/problem/${item.problem_uuid}`}
                      className="rounded-lg px-3 py-2 font-bold"
                      primary
                    >
                      Xem vấn đề
                    </Button>
                  </div>
                </Overview>
              );
            });
          })}
          {isFetchingNextPage && (
            <div className="relative mt-5 h-5">
              <LoadingAni>
                <span className="ml-4 text-sm text-gray-500">
                  Đang tải dữ liệu...
                </span>
              </LoadingAni>
            </div>
          )}
        </>
      )}
    </WrapperContent>
  );
}
