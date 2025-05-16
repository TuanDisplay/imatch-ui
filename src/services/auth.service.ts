import { TLoginSchema, TRegisterSchema } from '~/common/schema';
import * as httpRequest from '~/utils/httpRequest';

export const login = async (data: TLoginSchema) => {
  const res = await httpRequest.post('/customer/login', data);
  return res.data.token;
};

export const signUp = async (data: TRegisterSchema) => {
  await httpRequest.post('/customer/sign', {
    username: data.fname,
    email: data.email,
    password: data.password,
  });
};

export const sendCode = async (data: TRegisterSchema) => {
  await httpRequest.post('/customer/verify-otp', {
    email: data.email,
    otp_code: data.code,
  });
};

export const logout = async () => {
  await httpRequest.post(
    '/customer/logout',
  );
};
