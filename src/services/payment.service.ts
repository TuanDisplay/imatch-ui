import paymentRequest from '~/lib/axios/paymentRequest';

export const goPremium = async () => {
  const res = await paymentRequest.post('/customer/updatecustomer');
  return res.data;
};

export const webHookPremium = async (
  payment_uuid: string,
  status: 'success' | 'failed',
  amount: number,
) => {
  const res = await paymentRequest.post('/api/payment/webhookupdate', {
    uuid: payment_uuid,
    status: status,
    amount: amount,
  });
  return res.data;
};

export const paymentBuyIdea = async (idea_id: string) => {
  const res = await paymentRequest.post('/customer/buyideas', {
    idea_uuid: idea_id,
  });
  return res.data;
};

export const webHookIdeas = async (
  payment_uuid: string,
  status: 'success' | 'failed',
  ideas_uuid: string,
  amount: number,
) => {
  const res = await paymentRequest.post('/api/payment/webhookideas', {
    uuid: payment_uuid,
    status: status,
    produce_uuid: ideas_uuid,
    amount: amount,
  });
  return res.data;
};

export const paymentBuySol = async (problem_id: string) => {
  const res = await paymentRequest.post('/customer/buyproblem', {
    problem_uuid: problem_id,
  });
  return res.data;
};

export const webHookProblem = async (
  payment_uuid: string,
  status: 'success' | 'failed',
  problem_id: string,
  solution_id: string,
) => {
  const res = await paymentRequest.post('/api/payment/webhookproblem', {
    uuid: payment_uuid,
    status: status,
    produce_uuid: problem_id,
    solution_uuid: solution_id,
  });
  return res.data;
};
