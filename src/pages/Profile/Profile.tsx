export default function LightProfile() {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-[#111827]">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] bg-white px-10 py-20 shadow-md">
        <div className="flex items-center gap-6">
          <img
            src="/AvtTuan.jpg"
            alt="Avatar"
            className="border-primary h-28 w-28 rounded-xl border-4 shadow-md"
          />
          <div>
            <h1 className="text-primary border-primary text-4xl font-bold">
              HỒ SƠ
            </h1>
            <p className="mt-1 text-[#6b7280]">Thông tin cá nhân</p>
          </div>
          <div className="ml-auto">
            <button className="text-prborder-primary text-base transition hover:text-[#1d4ed8]">
              ✏️ Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="mt-5 rounded-t-3xl bg-white px-10 py-10 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">
          Thông Tin Cá Nhân
        </h2>

        <div className="grid gap-6 text-base text-[#374151] md:grid-cols-2">
          <div>
            <span className="font-semibold text-[#111827]">Họ và tên:</span>{' '}
            Trần Bảo Anh Huy
          </div>
          <div>
            <span className="font-semibold text-[#111827]">Ngày sinh:</span>{' '}
            10/10/2003
          </div>
          <div>
            <span className="font-semibold text-[#111827]">Email:</span>{' '}
            tnpv0702@gmail.com
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-xl font-semibold text-[#111827]">
            Giới thiệu bản thân
          </h3>
          <p className="leading-relaxed text-[#4b5563]">
            Xin chào! Tôi là một người đam mê sáng tạo và luôn tìm kiếm những ý
            tưởng đột phá. Tôi có kinh nghiệm trong lĩnh vực chuyên môn và mong
            muốn kết nối với những cá nhân, doanh nghiệp có cùng chí hướng để
            biến ý tưởng thành hiện thực. Hãy cùng nhau tạo ra những giá trị
            mới!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-primary flex justify-around border-t bg-white py-6 text-sm font-medium">
        {['Ý tưởng đã đăng', 'Ý tưởng đã mua', 'Yêu thích', 'Giải pháp'].map(
          (item) => (
            <button
              key={item}
              className="hover:text-primary text-[#6b7280] transition duration-200"
            >
              {item}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
