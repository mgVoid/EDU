import type { ITimestamps, IHasId } from './General';
import type { IPhoto } from './Photo';

export interface ITag extends ITimestamps, IHasId {
  photoId: IPhoto['id'];
  tag: string;
}
