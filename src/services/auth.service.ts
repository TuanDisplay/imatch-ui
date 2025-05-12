import { TLoginSchema, TRegisterSchema } from '~/common/schema';
import * as httpRequest from '~/utils/httpRequest';

export const login = async (data: TLoginSchema) => {
  const res = await httpRequest.post('/login', data);
  return res.data.token;
};

export const signUp = async (data: TRegisterSchema) => {
  await httpRequest.post('/sign', {
    username: data.fname,
    email: data.email,
    password: data.password,
  });
};

export const sendCode = async (data: TRegisterSchema) => {
  await httpRequest.post('/verify-otp', {
    email: data.email,
    otp_code: data.code,
  });
};
