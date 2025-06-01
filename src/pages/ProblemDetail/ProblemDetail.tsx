import { useParams } from 'react-router-dom';
import { CalendarDays, User, Settings, Lightbulb } from 'lucide-react';

import {
  convertCategoryName,
  convertCurrencyVN,
  convertStringToHtml,
} from '~/utils/files';
import Button from '~/components/Button';
import Mail from '~/components/Icons/Mail';
import Overview from '~/components/Overview';
import { useProblemDetail } from '~/hooks/ApiQuery/useProblemQuery';
import LoadingScreen from '~/layouts/components/LoadingScreen';
import { useMessageModal, useSolutionModal } from '~/hooks/useModalStore';
import { MessageModal } from '~/modals';
import CopyLink from '~/components/CopyLink';
import SolutionModal from '~/modals/SolutionModal';

function ProDeContent({ id }: { id: string }) {
  const { data, isLoading } = useProblemDetail(id);
  const { isMessageOpen, setIsMessageModal } = useMessageModal();
  const { isSolutionOpen, setIsSolutionModal } = useSolutionModal();

  const glancing = [
    { icon: <Lightbulb />, data: data?.views, name: 'Đề xuất' },
    { icon: <User />, data: data?.author },
    { icon: <CalendarDays />, data: '18/05/2025' },
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
              receiver_avatar={data?.imageUrl ? data?.imageUrl : ''}
            />
          )}

          {isSolutionOpen && (
            <SolutionModal id={id} proName={data?.title ? data?.title : ''} />
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
                              className="mt-4 flex gap-2 sm:w-1/2"
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
                      Vấn đề có tương tác cao
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        className="px-4 py-2 text-sm font-bold uppercase"
                        primary
                        onClick={() => setIsSolutionModal(true)}
                      >
                        Đưa giải pháp
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
                          Thưởng: {convertCurrencyVN(data?.price)}
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
  const { problemId } = useParams();
  if (!problemId) return <>Không tìm thấy ý tưởng</>;
  return <ProDeContent id={problemId} />;
}
