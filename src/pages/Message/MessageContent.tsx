import { WrapperContent } from '~/components/Content';
import { useMessageDe } from '~/hooks/ApiQuery/useMessageQuery';
import MessageItem from './MessageItem';
import { IUser } from '~/common/types/user';

interface IMessageContent {
  reveicer_id: string;
  reveicer_avatar: string;
  reveicer_name: string;
  reveicer_email: string;
  senderData: IUser | undefined;
}

export default function MessageContent({
  reveicer_id,
  reveicer_avatar,
  reveicer_email,
  reveicer_name,
  senderData,
}: IMessageContent) {
  const { data: dataDe, isLoading, error, refetch } = useMessageDe(reveicer_id);

  return (
    <WrapperContent
      key={reveicer_id}
      error={error}
      refetch={refetch}
      isLoading={isLoading}
    >
      {dataDe?.length === 0 ? (
        <div className="text-center">Không có tin nhắn</div>
      ) : (
        dataDe?.map((item, index) => {
          return (
            <div key={index}>
              {item.sender_uuid === reveicer_id ? (
                senderData && (
                  <MessageItem
                    avatar={senderData.avatar}
                    email={senderData.email}
                    name={senderData.fname}
                    title={item.title}
                    content={item.content}
                    time={item.created_at}
                  />
                )
              ) : (
                <MessageItem
                  avatar={reveicer_avatar}
                  email={reveicer_email}
                  name={reveicer_name}
                  title={item.title}
                  content={item.content}
                  time={item.created_at}
                />
              )}
            </div>
          );
        })
      )}
    </WrapperContent>
  );
}
