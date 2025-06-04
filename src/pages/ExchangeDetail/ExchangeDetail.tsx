import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, Eye, User, Settings } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import Button from '~/components/Button';
import Mail from '~/components/Icons/Mail';
import Overview from '~/components/Overview';
import LoadingScreen from '~/layouts/components/LoadingScreen';
import CopyLink from '~/components/CopyLink';
import { useIdeasDetail } from '~/hooks/ApiQuery/useIdeaQuery';
import { convertStringToHtml } from '~/utils/files';
import { MessageModal } from '~/modals';
import { useMessageModal } from '~/hooks/useModalStore';
import { convertCategoryName, convertCurrencyVN } from '~/utils/files';

function IdeaDetailContent({ id }: { id: string }) {
  const { data, isLoading } = useIdeasDetail(id);
  const { isMessageOpen, setIsMessageModal } = useMessageModal();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['ideas'] });
  }, [queryClient]);

  const glancing = [
    { icon: <Eye />, data: data?.views, name: 'Lượt xem' },
    { icon: <User />, data: data?.author },
    { icon: <CalendarDays />, data: '16/05/2025' },
    { icon: <Settings />, data: convertCategoryName(data?.catValue) },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white">
          {isMessageOpen && (
            <MessageModal
              id={data?.customer_id ? data?.customer_id : ''}
              receiver_name={data?.author ? data?.author : ''}
            />
          )}
          <div className="container mx-auto">
            <div className="relative isolate overflow-hidden pt-40 pb-25">
              <div className="px-15">
                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
                  <div className="mt-10">
                    <h1
                      title={data?.title}
                      className="line-clamp-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                      {data?.title}
                    </h1>
                    <div className="mt-4 border-y border-gray-300 lg:mt-8">
                      <div className="mb-3 flex flex-col sm:flex-row sm:flex-wrap lg:items-center">
                        {glancing.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="mt-4 flex gap-2 sm:w-1/2 2xl:w-auto"
                            >
                              {item.icon}
                              <span className="">
                                {item.data} {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-6 mb-6 text-sm font-bold uppercase">
                      Ý tưởng có tương tác cao
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        className="px-4 py-2 text-sm font-bold uppercase"
                        primary
                      >
                        Mua ý tưởng
                      </Button>
                      <div className="flex h-fit gap-2">
                        <div
                          className="cursor-pointer rounded-sm bg-gray-500 p-1"
                          title="send-mail"
                          onClick={() => setIsMessageModal(true)}
                        >
                          <Mail />
                        </div>
                        <CopyLink />
                      </div>
                      <div className="justify-end">
                        <div className="border-b-primary border-b-2 font-semibold">
                          Giá: {convertCurrencyVN(data?.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[450px] w-[560px] overflow-hidden rounded-xl bg-white shadow-lg">
                    <img
                      src={data?.imageUrl}
                      alt="thumbnail"
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 pt-16 pb-24">
            <div className="mx-auto max-w-[1160px]">
              <div className="w-full rounded-2xl bg-white px-5 py-10">
                <div className="flex flex-col items-center">
                  <h2 className="border-b-primary w-fit border-b-4 px-3 py-2 text-3xl font-bold uppercase">
                    Tổng quan
                  </h2>
                  <div className="grid grid-cols-1 gap-6 p-6">
                    <Overview title="Mô tả ý tưởng" icon="❗">
                      <div
                        className="leading-relaxed whitespace-pre-line text-gray-700"
                        dangerouslySetInnerHTML={convertStringToHtml(
                          data?.desc,
                        )}
                      ></div>
                    </Overview>
                    <Overview icon="✅" title="Giá Trị – Lợi Ích">
                      <div
                        className="leading-relaxed whitespace-pre-line text-gray-700"
                        dangerouslySetInnerHTML={convertStringToHtml(
                          data?.benefitValue,
                        )}
                      ></div>
                    </Overview>
                    <Overview icon="🖼️" title="Hình ảnh">
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {data?.image.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="max-h-[200px] overflow-hidden rounded-xl shadow-md"
                            >
                              <img src={item} className="object-cover" />
                            </div>
                          );
                        })}
                      </div>
                    </Overview>
                    {data?.isIP === 1 && (
                      <Overview
                        icon="🧠"
                        title="Quyền sở hữu trí tuệ (Đã đăng ký)"
                      >
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img
                            src={data.imageIP}
                            className="w-full object-cover"
                          />
                        </div>
                      </Overview>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ExchangeDetail() {
  const { exchangeId } = useParams();

  if (!exchangeId) return <>Không tìm thấy ý tưởng</>;

  return <IdeaDetailContent id={exchangeId} />;
}
