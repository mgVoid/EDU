import faker from 'faker';

import type { ITag } from '../interfaces/Tag';
import { Databases } from '../interfaces/General';

import Dates from './Dates';
import { orm } from './';

interface ITagClass {}

export default class Tag extends Dates implements ITag, ITagClass {
  constructor(
    public photoId: string = null,
    public id: string = faker.datatype.uuid(),
    public tag: string = faker.datatype.string()
  ) {
    super();
  }

  static create() {
    const tag = new this();
    // idedam i duomenu baze nauja irasa

    return tag;
  }

  static async createBulk(count: number, photosIds: string[]) {
    const tags: ITag[] = [...Array(count)].map((_) => {
      const randomPhotoID = photosIds[Math.floor(Math.random() * photosIds.length)];

      return new this(randomPhotoID);
    });

    await orm.writeToDatabase(Databases.TAGS, tags);
    return tags;
  }
  static async getPhotoTags(photoId: string): Promise<ITag[]> {
    const { tags } = await orm.readDatabase();
    return tags.filter((tag) => tag.photoId === photoId);
  }
  
}
