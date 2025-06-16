import { MenuItems, MenuItem } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { INotiApi } from '~/common/types/notification';
import * as notificationService from '~/services/notification.service';
import { convertIsoDMonth } from '~/utils/files';

const notiNameArr = [
  {
    beforeName: 'Ý tưởng đang kiểm duyệt ♻️',
    type: 'idea_post',
  },
  {
    beforeName: 'Ý tưởng đã được duyệt ✅',
    type: 'accept_idea',
  },
  {
    beforeName: 'Ý tưởng không được duyệt ❌',
    type: 'reject_idea',
  },
  {
    beforeName: 'Ý tưởng đã được mua 💱',
    type: 'buy_idea',
  },
  {
    beforeName: 'Vấn đề đang kiểm duyệt ♻️',
    type: 'problem_post',
  },
  {
    beforeName: 'Vấn đề đã được duyệt ✅',
    type: 'accept_problem',
  },
  {
    beforeName: 'Vấn đề không được duyệt ❌',
    type: 'reject_problem',
  },
  {
    beforeName: 'Có giải pháp mới cho vấn đề ℹ️',
    type: 'buy_problem',
  },
  {
    beforeName: 'Bạn có tin nhắn mới từ ℹ️',
    type: 'message',
  },
];

export default function Notification() {
  const { data } = useQuery({
    queryKey: ['notification'],
    queryFn: async (): Promise<INotiApi[]> => {
      const res = await notificationService.notification();
      return res.data;
    },
  });

  return (
    <MenuItems
      anchor="bottom"
      className="absolute right-0 z-50 mt-2 w-75 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
    >
      <div className="px-4 py-3">
        <p className="text-primary text-sm font-semibold uppercase">
          Thông báo
        </p>
      </div>

      <div className="max-h-60 overflow-y-auto">
        {data === null || data?.length === 0 ? (
          <div className="my-2 text-center text-sm">Chưa có thông báo</div>
        ) : (
          data?.map((message) => {
            const notiFind = notiNameArr.find(
              (item) => item.type === message.Type,
            );
            return (
              <MenuItem key={message.Uuid}>
                {
                  <div
                    className={clsx(
                      'cursor-pointer space-y-0.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={clsx('', {
                          'text-green-600':
                            message.Type === 'accept_idea' ||
                            message.Type === 'accept_problem',
                          'text-red-500':
                            message.Type === 'reject_idea' ||
                            message.Type === 'reject_problem',
                          'text-orange-500':
                            message.Type === 'idea_post' ||
                            message.Type === 'problem_post',
                          'text-blue-500':
                            message.Type === 'buy_idea' ||
                            message.Type === 'buy_problem',
                        })}
                      >
                        {notiFind?.beforeName}
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-70">
                        <Circle size={8} fill="#ff6e00" stroke="none" />
                        <span>{convertIsoDMonth(message.CreatedAt)}</span>
                      </div>
                    </div>
                    <div
                      title={message.Name}
                      className="line-clamp-1 opacity-80"
                    >{`${message.Name}`}</div>
                  </div>
                }
              </MenuItem>
            );
          })
        )}
      </div>
    </MenuItems>
  );
}
