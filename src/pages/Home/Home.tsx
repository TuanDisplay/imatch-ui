import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Scrollbar } from 'swiper/modules';

// import './Home.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Home() {
  return (
    <div className="">
      <Swiper
        // install Swiper modules
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
          <img src="/banner/4.png" alt="" className="bg-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner/4.png" alt="" className="bg-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner/4.png" alt="" className="bg-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
