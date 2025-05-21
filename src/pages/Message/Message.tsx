import { Search } from 'lucide-react';
import { useState } from 'react';
import Button from '~/components/Button';
import { useMessageModal } from '~/hooks/useModalStore';
import { MessageModal } from '~/modals';

const messages = [
  {
    id: 1,
    sender: 'Trần Ngọc Phương',
    subject: 'Quy trình lắp đặt hệ thống pin...',
    avatar: 'https://i.pravatar.cc/100?img=1',
    time: 'T3 07/02/2025 21:08 CH',
    email: 'tranbaoanhhuy@gmail.com',
    content: `Kính gửi: Cô Vân Phạm Văn An\n\nTôi là Trần Bảo Anh Huy. Hiện đang có một vài thắc mắc liên quan đến hệ thống pin năng lượng mặt trời và muốn tìm hiểu thêm về các vấn đề sau:\n\n1. Cách lắp đặt:\n   Quy trình lắp đặt hệ thống pin năng lượng mặt trời như thế nào? Có những yêu cầu kỹ thuật hoặc điều kiện gì khi lắp đặt không?\n\n2. Bảo hành và tuổi thọ:\n   Chính sách bảo hành của pin năng lượng là bao lâu? Tuổi thọ trung bình của sản phẩm này là bao nhiêu năm?\n\n3. Hiệu suất và độ tối ưu:\n   Hiệu suất của thiết bị này là bao nhiêu %? Chẳng hạn có những yếu tố ảnh hưởng đến độ hiệu quả sử dụng pin dưới nhiều kiểu thời tiết khác nhau?\n\nTôi mong nhận được phản hồi từ anh sớm nhất.\n\nRất mong tin.\nTrần Bảo Anh Huy\nThông tin liên hệ:\nSDT: 0972873939\nEmail: tranbaoanhhuy@gmail.com`,
  },
  // Add more messages here...
];

export default function Message() {
  const [selectedId, setSelectedId] = useState(1);
  const { isMessageOpen, setIsMessageModal } = useMessageModal();
  const selectedMessage = messages.find((msg) => msg.id === selectedId);

  return (
    <>
      {isMessageOpen && <MessageModal />}
      <div className="relative flex justify-center">
        <img
          src="/banner/exchange-banner.jpg"
          alt="exchange-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Tin nhắn
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Xem và quản lý các cuộc trò chuyện
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5 mb-10">
        <div className="flex bg-gray-100">
          <div className="w-[300px] border-r bg-white p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`flex cursor-pointer items-start gap-3 rounded p-2 transition hover:bg-gray-200 ${
                  selectedId === msg.id
                    ? 'border-l-4 border-orange-500 bg-gray-100'
                    : ''
                }`}
              >
                <img
                  src={msg.avatar}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="truncate text-sm font-semibold">
                    {msg.sender}
                  </div>
                  <div className="truncate text-xs text-gray-500">
                    {msg.subject}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-end gap-2">
              <Button
                className="px-3 py-1.5 font-bold"
                primary
                onClick={() => setIsMessageModal(true)}
              >
                Phản hồi
              </Button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="rounded border py-1.5 pr-4 pl-10 text-sm"
                />
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="rounded bg-white p-4 shadow">
              <h1 className="mb-2 text-lg font-semibold uppercase">
                CÔNG NGHỆ PIN NĂNG LƯỢNG MẬT TRỜi HIỆN NAY VÀ CÁCH LắP ĐẶT
              </h1>

              {selectedMessage && (
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src={selectedMessage.avatar}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {selectedMessage.sender}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedMessage.email}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">
                      {selectedMessage.time}
                    </div>
                  </div>
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
