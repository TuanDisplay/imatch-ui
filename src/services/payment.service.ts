import paymentRequest from '~/lib/axios/paymentRequest';

export const goPremium = async () => {
  const res = await paymentRequest.post('/customer/updatecustomer');
  return res.data;
};

export const webHookPremium = async (
  uuid_payment: string,
  status: 'success' | 'failed',
  amount: number,
) => {
  const res = await paymentRequest.post('/api/payment/webhookupdate', {
    uuid: uuid_payment,
    status: status,
    amount: amount,
  });
  return res.data;
};

export const paymentUser = async (uuid_product: string, amount: number) => {
  const res = await paymentRequest.post('/customer/payment', {
    uuid: uuid_product,
    amount: amount,
  });
  return res.data;
};

export const webHookUser = async (
  uuid_payment: string,
  status: 'success' | 'failed',
  amount: number,
) => {
  const res = await paymentRequest.post('/api/payment/webhook', {
    uuid: uuid_payment,
    status: status,
    amount: amount,
  });
  return res.data;
};
