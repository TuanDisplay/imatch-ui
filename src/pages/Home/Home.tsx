import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Button from '~/components/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SlideItem, CardItem } from './HomeItem';
import { ChevronCircleIcon } from '~/components/Icons/';
import { useIdeas } from '~/hooks/ApiQuery/useIdeaQuery';
import { useProblem } from '~/hooks/ApiQuery/useProblemQuery';
import LoadingScreen from '~/layouts/components/LoadingScreen';
import { mapIdea } from '~/utils/map/idea';
import { useMemo } from 'react';
import { mapPro } from '~/utils/map/problem';
import clsx from 'clsx';

export default function Home() {
  const {
    data: ideaList,
    isLoading: ideaLoading,
    error,
    refetch,
  } = useIdeas({
    top_view_only: true,
  });
  const { data: problemList, isLoading: problemLoading } = useProblem({
    top_view_only: true,
  });

  const ideaData = useMemo(() => {
    return ideaList?.items ? ideaList?.items.map(mapIdea) : [];
  }, [ideaList?.items]);

  const proData = useMemo(() => {
    return problemList?.items ? problemList?.items.map(mapPro) : [];
  }, [problemList?.items]);

  const ideaDataLength = useMemo(() => {
    if (ideaData.length < 1) return undefined;
    if (ideaData.length > 2) {
      return 3;
    } else if (ideaData.length === 1) {
      return 1;
    } else if (ideaData.length === 2) {
      return 2;
    }
  }, [ideaData]);

  const proDataLength = useMemo(() => {
    if (proData.length < 1) return undefined;
    if (proData.length > 2) {
      return 3;
    } else if (proData.length === 1) {
      return 1;
    } else if (proData.length === 2) {
      return 2;
    }
  }, [proData]);

  return (
    <div className="wrapper">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src="/banner/home-banner5.webp"
            alt="banner1"
            className="bg-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/banner/home-banner2.webp"
            alt="banner2"
            className="bg-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/banner/home-banner4.webp"
            alt="banner3"
            className="bg-cover"
          />
        </SwiperSlide>
      </Swiper>
      <div className="relative bg-[#F6F6F6] py-10 max-md:py-5">
        <div className="container mx-auto">
          <div className="mx-auto flex w-full max-w-[915px] justify-center gap-16">
            <div className="flex max-w-[400px] flex-col items-center justify-start gap-4 rounded-md bg-white px-10 py-7">
              <Swiper
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="expert-pagination mx-auto w-full max-w-screen-xl"
              >
                <SwiperSlide>
                  <SlideItem
                    imageUrl="/AvtTuan.jpg"
                    name="Ths. Viết Tuấn"
                    major="Chuyên gia phần mềm"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideItem
                    imageUrl="/AvtHuy.webp"
                    name="Ths. Anh Huy"
                    major="Chuyên gia phần mềm"
                  />
                </SwiperSlide>
              </Swiper>

              <h2 className="line-clamp-2 text-center font-bold">
                Thảo luận cùng các chuyên gia để <br /> tìm ra giải pháp tối ưu!
              </h2>
              <Button
                to="/expert"
                className="px-3 py-2 text-sm font-bold"
                primary
              >
                LIÊN HỆ NGAY
              </Button>
            </div>

            <div className="flex flex-col justify-center gap-8">
              <h2 className="text-skyBlue-900 hover:text-primary line-clamp-2 text-4xl leading-12 font-bold duration-500">
                <Link to="/about">
                  Trải nghiệm các ý tưởng độc đáo và sáng tạo
                </Link>
              </h2>
              <p className="font-montserrat line-clamp-6 leading-7 font-normal tracking-[3%]">
                Chào mừng bạn đến với I-Match nơi trải nghiệm các ý tưởng độc
                đáo và sáng tạo. Chúng tôi cung cấp không gian kết nối, tư vấn
                và phát triển ý tưởng, giúp bạn biến sáng kiến thành hiện thực
                với sự hỗ trợ từ các chuyên gia hàng đầu. Dù bạn đang tìm kiếm
                giải pháp kinh doanh, đổi mới công nghệ hay sáng tạo nghệ
                thuật...
              </p>
              <Button
                to="/about"
                rightIcon={
                  <ArrowRight className="duration-1000 group-hover:translate-x-2" />
                }
                className="text-LGreen-500 group hover:text-primary justify-start text-xl font-bold"
              >
                Đọc tiếp
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 max-md:py-5">
        <div className="mx-auto mb-10 w-full max-w-[807px] text-center max-lg:mb-5">
          <h2 className="text-4xl font-bold max-lg:text-2xl">
            Những ý tưởng nổi bật trong tháng
          </h2>
          <p className="mt-[30px] text-lg font-light">
            Khám phá những ý tưởng sáng tạo và đổi mới hàng đầu, được tuyển chọn
            từ cộng đồng chuyên gia và nhà sáng tạo.
          </p>
        </div>
        {ideaLoading ? (
          <LoadingScreen className="!h-[300px]" />
        ) : error ? (
          <>
            <div>Có lỗi xảy ra: {(error as Error).message}</div>
            <Button className="px-3 py-2" primary onClick={refetch}>
              Tải lại
            </Button>
          </>
        ) : (
          <div
            className={clsx('flex justify-between px-[70px]', {
              'px-[450px]': ideaData.length === 1,
              'px-[250px]': ideaData.length === 2,
            })}
          >
            <Swiper
              slidesPerView={ideaDataLength}
              spaceBetween={40}
              loop={ideaData.length > 3}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              modules={[Pagination, Navigation]}
              className="idea-pagination px-5! pb-15!"
            >
              <button className="swiper-button-prev-custom absolute top-1/2 left-1 z-10 -translate-y-1/2 text-black">
                <ChevronCircleIcon type="left" />
              </button>
              <button className="swiper-button-next-custom absolute top-1/2 right-1 z-10 -translate-y-1/2 text-black">
                <ChevronCircleIcon type="right" />
              </button>
              {ideaData?.map((item) => {
                return (
                  <SwiperSlide>
                    <CardItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      catValue={item.catValue}
                      title={item.title}
                      desc={item.desc}
                      author={item.author}
                      views={item.views}
                      publishDate={item.publishDate}
                      type="exchange"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
      <div className="container mx-auto py-10 max-md:py-5">
        <div className="mx-auto mb-10 w-full max-w-[807px] text-center max-lg:mb-5">
          <h2 className="text-4xl font-bold max-lg:text-2xl">
            Những thách thức nổi bật
          </h2>
          <p className="mt-[30px] text-lg font-light">
            Khám phá những vấn đề quan trọng mà cá nhân và tổ chức đang đối mặt
            – liệu bạn có thể tìm ra giải pháp?
          </p>
        </div>
        {problemLoading ? (
          <LoadingScreen className="!h-[300px]" />
        ) : (
          <div
            className={clsx('flex justify-between px-[70px]', {
              'px-[450px]': proData.length === 1,
              'px-[250px]': proData.length === 2,
            })}
          >
            <Swiper
              slidesPerView={proDataLength}
              spaceBetween={40}
              loop={proData.length >= 3}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              modules={[Pagination, Navigation]}
              className="idea-pagination px-5! pb-15!"
            >
              <button className="swiper-button-prev-custom absolute top-1/2 left-1 z-10 -translate-y-1/2 text-black">
                <ChevronCircleIcon type="left" />
              </button>
              <button className="swiper-button-next-custom absolute top-1/2 right-1 z-10 -translate-y-1/2 text-black">
                <ChevronCircleIcon type="right" />
              </button>
              {proData?.map((item) => {
                return (
                  <SwiperSlide>
                    <CardItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      catValue={item.catValue}
                      title={item.title}
                      desc={item.desc}
                      price={item.price}
                      submission={item.submission}
                      publishDate={item.publishDate}
                      type="problem"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
