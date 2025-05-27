import { IExpApi, IExpDeApi } from '~/common/types/expert';

export const mapExpert = (raw: IExpApi) => {
  return {
    id: raw.uuid,
    author: raw.expertname,
    desc: raw.introduce,
    imageUrl: raw.image,
    // mainMajor: raw.industry[0],
    consultCount: raw.consultation,
    rate: raw.rating,
    views: raw.view,
  };
};

export const mapExpertDe = (raw: IExpDeApi) => {
  return {
    id: raw.uuid,
    author: raw.expertname,
    desc: raw.introduce,
    imageUrl: raw.image,
    majors: raw.industry,
    // mainMajor: raw.industry[0],
    consultCount: raw.consultation,
    rate: raw.rating,
    views: raw.view,
    achievements: raw.achievement,
    email: raw.email,
  };
};
