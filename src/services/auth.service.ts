import { TLoginSchema, TRegisterSchema } from '~/common/schema';
import { customerRequest } from '~/lib/axios';

export const login = async (data: TLoginSchema) => {
  const res = await customerRequest.post('/customer/login', data);
  return res.data.data.token;
};

export const signUp = async (data: TRegisterSchema) => {
  await customerRequest.post('/customer/sign', {
    username: data.fname,
    email: data.email,
    password: data.password,
  });
};

export const sendCode = async (data: TRegisterSchema) => {
  await customerRequest.post('/customer/verify-otp', {
    email: data.email,
    otp_code: data.code,
  });
};

export const logout = async () => {
  await customerRequest.post('/customer/logout');
};
