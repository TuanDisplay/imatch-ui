export interface IUserApi {
  uuid: string;
  email: string;
  image: string;
  introduce: string;
  username: string;
  start_day: string;
  end_day: string;
}

export interface IUser {
  id: string;
  fname: string;
  email: string;
  bio: string;
  avatar: string;
  start_day: string;
  end_day: string;
}

export interface IPaymentUser {
  message: string;
  payment_uuid: string;
  qr_image: string;
}
