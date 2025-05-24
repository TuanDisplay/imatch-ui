import { IUserApi } from '~/common/types/user';

export const mapUProfile = (raw: IUserApi) => {
  return {
    id: raw.uuid,
    fname: raw.username,
    email: raw.email,
    bio: raw.introduce,
    avatar: raw.image,
  };
};
