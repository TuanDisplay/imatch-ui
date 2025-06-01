export interface IUMesApi {
  avatar: string;
  name: string;
  title: string;
  uuid: string;
}

export interface IUMesDeApi {
  content: string;
  created_at: string;
  is_delete: number;
  receiver_uuid: string;
  sender_uuid: string;
  title: string;
  uuid: string;
  image: string;
}
