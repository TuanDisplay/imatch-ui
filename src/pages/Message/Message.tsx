import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { useMessage } from '~/hooks/ApiQuery/useMessageQuery';
import { useMessageModal } from '~/hooks/useModalStore';
import { MessageModal } from '~/modals';
import { IUMesApi } from '~/common/types/message';
import MessageContent from './MessageContent';
import { useUProfile } from '~/hooks/ApiQuery/useUserQuery';
import { WrapperContent } from '~/components/Content';

export default function Message() {
  const [selectedUser, setSelectedUser] = useState<IUMesApi>({
    uuid: '',
    avatar: '',
    name: '',
    email: '',
    user_type: 'customer',
  });
  const { isMessageOpen, setIsMessageModal } = useMessageModal();

  const { data: dataList, isLoading, error, refetch } = useMessage();
  const { data: senderData } = useUProfile();

  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setSelectedUser(dataList[0]);
    }
  }, [dataList]);

  return (
    <>
      {isMessageOpen && (
        <MessageModal
          id={selectedUser.uuid}
          receiver_name={selectedUser.name}
          receiver_type={selectedUser.user_type}
        />
      )}
      <div className="relative flex justify-center">
        <img
          src="/banner/message-banner.jpg"
          alt="message-banner"
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
      <WrapperContent isLoading={isLoading} error={error} refetch={refetch}>
        {dataList?.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Không có cuộc trò chuyện nào.
          </div>
        ) : (
          <div className="container mx-auto mt-5 mb-10">
            <div className="flex bg-gray-100">
              <div className="w-[300px] border-r bg-white p-2">
                {dataList?.map((msg) => (
                  <div
                    key={msg.uuid}
                    onClick={() => setSelectedUser(msg)}
                    className={`flex cursor-pointer items-start gap-3 rounded p-2 transition hover:bg-gray-200 ${
                      selectedUser.uuid === msg.uuid
                        ? 'border-l-4 border-orange-500 bg-gray-100'
                        : ''
                    }`}
                  >
                    <img
                      src={
                        msg.avatar == '' || !msg.avatar
                          ? '/no-user.png'
                          : msg.avatar
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="truncate text-sm font-semibold">
                        {msg.name == '' ? 'Không xác định' : msg.name}
                      </div>
                      <div
                        title={msg.email}
                        className="line-clamp-1 text-xs text-gray-500"
                      >
                        {msg.email}
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
                <MessageContent
                  reveicer_id={selectedUser?.uuid}
                  reveicer_avatar={selectedUser?.avatar}
                  reveicer_name={selectedUser?.name}
                  reveicer_email={selectedUser?.email}
                  senderData={senderData}
                />
              </div>
            </div>
          </div>
        )}
      </WrapperContent>
    </>
  );
}
