import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import Comment from './Comment';
import { BookingModal, MessageModal } from '~/modals';
import { useBookingModal, useMessageModal } from '~/hooks/useModalStore';
import NotFound from '../NotFound';
import { useExpertDetail } from '~/hooks/ApiQuery/useExpertQuery';
import { convertCategoryName } from '~/utils/files';
import LoadingScreen from '~/layouts/components/LoadingScreen';

function ExpertDeContent({ id }: { id: string }) {
  const { isBookingOpen, setIsBookingModal } = useBookingModal();
  const { isMessageOpen, setIsMessageModal } = useMessageModal();

  const { data, isLoading } = useExpertDetail(id);

  return (
    <>
      {isBookingOpen && <BookingModal />}
      {isMessageOpen && (
        <MessageModal
          id={data?.id ? data?.id : ''}
          receiver_name={data?.author ? 'ThS. ' + data?.author : ''}
          user_type="expert"
        />
      )}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="relative flex justify-center">
            <img
              src="/banner/uminh-banner.jpg"
              alt="exchange-banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
              <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
                Hồ sơ chuyên gia
              </h2>
              <div className="mx-auto my-5 w-full lg:w-[80%]">
                <div className="text-shadow line-clamp-3 text-xl text-white">
                  Thảo luận cùng các chuyên gia để tìm ra giải pháp tối ưu!
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto my-10 max-w-6xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="col-span-1 flex flex-col items-center">
                <img
                  src={data?.imageUrl}
                  alt="avatar"
                  className="h-60 w-48 rounded-xl object-cover shadow-md"
                />
                <div className="mt-4 text-gray-500">
                  <p>{data?.rate}/5.0 ⭐ </p>
                  <p>{data?.consultCount} lượt tư vấn</p>
                  <p>{data?.views} lượt xem</p>
                </div>
              </div>

              <div className="col-span-2 space-y-5">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <h2 className="text-primary text-lg font-semibold">
                        Họ và tên
                      </h2>
                      <p className="mt-1 text-gray-600">{data?.author}</p>
                    </div>
                    <div>
                      <h2 className="text-primary text-lg font-semibold">
                        Email
                      </h2>
                      <p className="mt-1 text-gray-600">{data?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="px-4 py-2 font-semibold"
                      primary
                      onClick={() => {
                        setIsMessageModal(true);
                      }}
                    >
                      Liên hệ
                    </Button>
                    <Button
                      className="px-4 py-2 font-semibold"
                      primary
                      onClick={() => setIsBookingModal(true)}
                    >
                      Đặt lịch
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-primary text-lg font-semibold">
                    Giới thiệu bản thân
                  </h3>
                  <p className="mt-1 text-gray-700">{data?.desc}</p>
                </div>

                <div>
                  <h3 className="text-primary text-lg font-semibold">
                    Thành tựu
                  </h3>
                  <ul className="mt-1 ml-5 list-disc space-y-1 text-gray-700">
                    {data?.achievements?.map((achie, index) => {
                      return <li key={index}>{achie}</li>;
                    })}
                  </ul>
                </div>

                <div>
                  <h3 className="text-primary text-lg font-semibold">
                    Lĩnh vực tư vấn
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data?.majors.map((field, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-gray-800"
                      >
                        {convertCategoryName(field)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Comment expert_id={id} />
          </div>
        </>
      )}
    </>
  );
}

export default function ExpertDetail() {
  const { expertId } = useParams();
  if (!expertId) return <NotFound />;

  return <ExpertDeContent id={expertId} />;
}
