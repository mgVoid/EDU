import faker from 'faker';

import type { IPhoto } from '../interfaces/Photo';
import type { ITag } from '../interfaces/Tag';
import { Databases } from '../interfaces/General';

import Dates from './Dates';
import { orm } from './';

interface IPhotoClass {}

export default class Photo extends Dates implements IPhoto, IPhotoClass {
  constructor(
    public userId: string,
    public id: string = faker.datatype.uuid(),
    public imgUrl: string = faker.image.imageUrl(),
    public verifiedStatus: boolean = faker.datatype.boolean(),
    public description: string = faker.lorem.paragraph(1000),
    public fireCount: number = faker.datatype.number(),
    public tags: ITag[] = []
  ) {
    super();
    if (description.length > 500){
      description = description.slice(0, 500 - 1)
    }
  }

  static create(userId: string) {
    return new this(userId);
  }

  static async createBulk(count: number, usersIds: string[]) {
    const photos: IPhoto[] = [...Array(count)].map(() => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];

      return new this(randomUserId);
    });

    await orm.writeToDatabase(Databases.PHOTOS, photos);
    return photos;
  }

  static async getUserPhotos(userId: string): Promise<IPhoto[]> {
    const { photos } = await orm.readDatabase();
    return photos.filter((photo) => photo.userId === userId);
  }
}
