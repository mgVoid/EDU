import type { ITimestamps, IHasId } from './General';
import type { IPhoto } from './Photo';

export enum UserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  BANNED = 'banned',
}
export interface IUser extends ITimestamps, IHasId {
  firstName: string;
  lastName: string;
  pseudoName: string;
  userStatus: UserStatus;
  photos: IPhoto[];
}
