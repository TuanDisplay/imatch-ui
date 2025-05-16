import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import { ExpertCard, CommentCard } from '~/common/data';
import Comment from '~/components/Comment';
import { BookingModal, MessageModal } from '~/modals';
import { useBookingModal, useMessageModal } from '~/hooks/useModalStore';

export default function ExpertDetail() {
  const { expertId } = useParams();
  const { isBookingOpen, setIsBookingModal } = useBookingModal();
  const { isMessageOpen, setIsMessageModal } = useMessageModal();

  const data = ExpertCard.find((item) => item.id.toString() === expertId);

  return (
    <>
      {isBookingOpen && <BookingModal />}
      {isMessageOpen && <MessageModal />}
      <div className="relative flex justify-center">
        <img
          src="/banner/about-banner.jpg"
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
              src={`/${data?.imageUrl}`}
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-30">
                <div>
                  <h2 className="text-primary text-lg font-semibold">
                    Họ và tên
                  </h2>
                  <p className="mt-1 text-gray-600">{data?.author}</p>
                </div>
                <div>
                  <h2 className="text-primary text-lg font-semibold">
                    Ngày sinh
                  </h2>
                  <p className="mt-1 text-gray-600">14/03/1879</p>
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
              <h3 className="text-primary text-lg font-semibold">Thành tựu</h3>
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
                {['Nông nghiệp', 'Công Nghiệp', 'Công Nghệ', 'Môi Trường'].map(
                  (field) => (
                    <span
                      key={field}
                      className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-gray-800"
                    >
                      {field}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8 mt-10">
          <div className="text-xl font-bold">Đánh giá và bình luận</div>
          <div className="mt-5">
            {CommentCard.map((item) => {
              return (
                <Comment
                  key={item.id}
                  imageUrl={item.imageUrl}
                  author={item.author}
                  publishDate={item.publishDate}
                  desc={item.desc}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
