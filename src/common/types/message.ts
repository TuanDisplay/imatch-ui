export interface IUMesApi {
  avatar: string;
  name: string;
  email: string;
  user_type: 'customer' | 'expert';
  uuid: string;
}

export interface IUMesDeApi {
  uuid: string;
  content: string;
  sender_uuid: string;
  sender_name: string;
  receiver_uuid: string;
  user_type: 'customer' | 'expert';
  title: string;
  created_at: string;
  is_delete: number;
}
