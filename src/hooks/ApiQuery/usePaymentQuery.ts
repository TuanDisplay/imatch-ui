import { useQuery } from '@tanstack/react-query';
import { IPaymentUser } from '~/common/types/user';
import * as paymentService from '~/services/payment.service';

export const usePayPremium = () => {
  return useQuery({
    queryKey: ['payPremium'],
    queryFn: async (): Promise<IPaymentUser> => {
      const res = await paymentService.goPremium();
      return res;
    },
  });
};

export const usePayIdeas = (id: string) => {
  return useQuery({
    queryKey: ['payIdeas'],
    queryFn: async (): Promise<IPaymentUser> => {
      const res = await paymentService.paymentBuyIdea(id);
      return res;
    },
  });
};
