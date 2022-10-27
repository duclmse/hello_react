export interface IUser {
  activity?: string;
  id: string;
  image: string;
  status: UserStatus;
  username: string;
}

export enum UserStatus {
  Away = "Away",
  Busy = "Busy",
  Offline = "Offline",
  Online = "Online",
}
