export interface IExpFreeTimeApi {
  Uuid: string;
  ExpertUuid: string;
  StartDateTime: string;
  EndDateTime: string;
  IsBooked: boolean;
  CreatedAt: string;
}

export interface IUserBookingApi {
  booking_uuid: string;
  message: string;
}
