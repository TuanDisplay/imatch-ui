import { IUser, IUserApi } from '~/common/types/user';

export const mapUProfile = (raw: IUserApi): IUser => {
  return {
    id: raw.uuid,
    fname: raw.username,
    email: raw.email,
    bio: raw.introduce,
    avatar: raw.image,
    start_day: raw.start_day,
    end_day: raw.end_day,
  };
};
