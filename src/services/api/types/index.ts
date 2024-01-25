export interface EventRequest {
  userId?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
}

export interface DataLogin {
  username: string;
  password: string;
}
export interface DataRegister {
  username: string;
  email: string;
  password: string;
}

export interface EventData {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  userId?: string;
  __v?: number;
}
