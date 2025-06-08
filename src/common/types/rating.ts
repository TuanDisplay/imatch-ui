export interface IExpReviewPage {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: IExpReviewItem[];
}

export interface IExpReviewItem {
  uuid: string;
  customer_uuid: string;
  customer_name: string;
  customerAvartar: string;
  rating: number;
  comment: string;
}
