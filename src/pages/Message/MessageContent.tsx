import { convertIsoDateTime, convertStringToHtml } from '~/utils/files';
import { WrapperContent } from '~/components/Content';
import { useMessageDe } from '~/hooks/ApiQuery/useMessageQuery';

interface IMessageContent {
  uuid_reveicer: string;
}

export default function MessageContent({ uuid_reveicer }: IMessageContent) {
  const { data: dataDe, isLoading } = useMessageDe(uuid_reveicer);
  const messageQuery = useMessageDe(uuid_reveicer);

  return (
    <WrapperContent queryResultObject={messageQuery} isLoading={isLoading}>
      {dataDe?.length === 0 ? (
        <div className="text-center">Không có dữ liệu</div>
      ) : (
        dataDe?.map((item, index) => {
          return (
            <div key={index} className="rounded bg-white p-4 shadow">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <img
                    src={
                      item.image == '' || !item.image
                        ? '/no-user.png'
                        : item.image
                    }
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {item.sender_uuid == ''
                        ? 'Không xác định'
                        : item.sender_uuid}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.uuid == '' ? 'Không xác định' : item.uuid}
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">
                    {convertIsoDateTime(item.created_at)}
                  </div>
                </div>
                <h3 className="my-1 text-sm font-semibold">{item.title}</h3>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={convertStringToHtml(item.content)}
                ></p>
              </div>
            </div>
          );
        })
      )}
    </WrapperContent>
  );
}
