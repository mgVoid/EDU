import type { ITimestamps, IHasId } from './General';
import type { IUser } from './User';
import type { ITag } from './Tag';

export interface IPhoto extends ITimestamps, IHasId {
  userId: IUser['id'];
  imgUrl: string;
  verifiedStatus: boolean;
  description: string;
  fireCount: number;
  tags: ITag[];
}
