import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '~/components/Button';
import { Modal } from '~/components/Popup';
import { useReviewModal } from '~/hooks/useModalStore';
import * as ratingService from '~/services/rating.service';

const ReviewModal = ({ expert_id }: { expert_id: string }) => {
  const [ratingSel, setRatingSel] = useState<number>(5);
  const [commentValue, setCommentValue] = useState<string>('');
  const { setIsReviewModal } = useReviewModal();
  const queryClient = useQueryClient();

  const ratingLabels: { [key: number]: string } = {
    1: '🥲 Tệ vãi',
    2: '😑 Tệ',
    3: '🙄 Cũng cũng',
    4: '😗 Ngon',
    5: '😏 Yeh',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ratingService.postReview(expert_id, ratingSel, commentValue);
      queryClient.invalidateQueries({ queryKey: ['expReview'] });
      setIsReviewModal(false);
      toast.success('Đánh giá thành công');
    } catch (err) {
      console.error(err);
      toast.error('Lỗi đánh giá');
    }
  };

  return (
    <Modal className="relative w-full max-w-md rounded-xl bg-white shadow-lg">
      <div className="px-5 py-4">
        <h2 className="mb-4 text-xl font-semibold">Đánh giá & Bình luận</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <span
                    key={star}
                    className={clsx(
                      'cursor-pointer text-2xl text-gray-300 transition-colors hover:text-yellow-300',
                      {
                        'text-yellow-400': star <= ratingSel,
                      },
                    )}
                    onClick={() => {
                      setRatingSel(star);
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>
            <div className="w-1/4 text-nowrap text-gray-600">
              {ratingLabels[ratingSel]}
            </div>
          </div>

          <textarea
            value={commentValue}
            placeholder="Viết bình luận của bạn..."
            className="h-28 w-full resize-none rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setCommentValue(e.target.value)}
          />

          <Button
            type="submit"
            className="mt-4 w-full py-2"
            premium
            disable={!commentValue.trim()}
          >
            Gửi đánh giá
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
