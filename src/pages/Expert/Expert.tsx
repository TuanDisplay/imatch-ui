export default function Expert() {
  return (
    <div className="relative flex justify-center">
      <img
        src="/banner/exchange-banner.jpg"
        alt="exchange-banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
        <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
          Chuyên gia tư vấn
        </h2>
        <div className="mx-auto my-5 w-full lg:w-[80%]">
          <div className="text-shadow line-clamp-3 text-xl text-white">
            Thảo luận cùng các chuyên gia để tìm ra giải pháp tối ưu!
          </div>
        </div>
      </div>
    </div>
  );
}
