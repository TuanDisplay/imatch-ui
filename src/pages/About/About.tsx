import Button from '~/components/Button';
import { DAboutMe } from './data';

export default function About() {
  return (
    <div className="font-montserrat">
      <div className="relative flex w-full justify-center">
        <img
          src="/banner/about-banner.jpg"
          alt="about-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Về chúng tôi
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Chào mừng bạn đến với I-Match, nơi kết nối những ý tưởng sáng tạo
              với những giải pháp thực tiễn cho cá nhân và doanh nghiệp. Chúng
              tôi là nền tảng tiên phong trong việc trao đổi, mua bán ý tưởng và
              đề xuất các giải pháp đột phá, phù hợp với xu hướng phát triển
              hiện đại.
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-[1100px] py-20">
        <div className="rounded-sm px-10 py-4 shadow-2xl">
          <div className="mt-5 mb-10 text-center">
            <h3 className="text-LGreen-500 text-3xl font-bold uppercase">
              HÀNH TRÌNH CỦA NHÀ SÁNG LẬP HỆ THỐNG MUA BÁN Ý TƯỞNG
            </h3>
            <p className="mt-3">
              Trong thời đại mà ý tưởng có thể trở thành tài sản quý giá, chúng
              tôi đã nhìn thấy một vấn đề lớn: Nhiều người có ý tưởng sáng tạo
              nhưng không có đủ nguồn lực để hiện thực hóa, trong khi các doanh
              nghiệp và nhà đầu tư lại luôn tìm kiếm những ý tưởng đột phá.
            </p>
          </div>
          {DAboutMe.map((data, index) => {
            return (
              <div key={index} className="mt-10">
                <h3 className="text-primary text-xl font-bold">{data.title}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: data.phase }}
                  className="mt-3"
                />
              </div>
            );
          })}
          <Button
            to="/Exchange"
            className="mt-10 px-5 py-2 text-center text-xl font-bold"
            primary
          >
            I-Match luôn sẵn sàng đồng hành cùng bạn
          </Button>
        </div>
      </div>
    </div>
  );
}
