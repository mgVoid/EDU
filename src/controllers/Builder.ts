import type { IUser } from '../interfaces/User';
import type { IPhoto } from '../interfaces/Photo';
import type { ITag } from '../interfaces/Tag';

import { User, Photo, Tag } from '../models';

interface IBuilder {
  makeDatabase: () => void;
}

export default class Builder implements IBuilder {
  private users: IUser[] = [];
  private photos: IPhoto[] = [];
  private tags: ITag[] = [];

  constructor(
    private usersCount: number = 10,
    private photosCount: number = 20,
    private tagsCount: number = 30
  ) {}

  public async makeDatabase() {
    this.users = await this.makeUsers();
    this.photos = await this.makePhotos();
    this.tags = await this.makeTags();
  }

  private async makeUsers() {
    console.log(`Making ${this.usersCount} users...`);
    return User.createBulk(this.usersCount);
  }

  private async makePhotos() {
    if (!this.users.length) {
      throw new Error('Users mock is empty, need to create users first');
    }

    console.log(`Making ${this.photosCount} photos...`);
    const usersIds = this.users.map((user) => user.id);
    return Photo.createBulk(this.photosCount, usersIds);
  }

  private async makeTags() {
    if (!this.photos.length) {
      throw new Error('Photos mock is empty, need to create photos first');
    }

    console.log(`Making ${this.tagsCount} tags...`);
    const photosIds = this.photos.map((photo) => photo.id);
    return Tag.createBulk(this.tagsCount, photosIds);
  }
}
