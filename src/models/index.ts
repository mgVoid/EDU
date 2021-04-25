import fs from 'fs';
import path from 'path';

import type { Databases } from '../interfaces/General';
import type { IUser } from '../interfaces/User';
import type { IPhoto } from '../interfaces/Photo';
import type { ITag } from '../interfaces/Tag';

import User from './User';
import Tag from './Tag';
import Photo from './Photo';

const databasePath = path.resolve(`${__dirname}/../../database.json`);

const databaseInit = () => {
  if (!fs.existsSync(databasePath)) {
    const database = { users: [], photos: [], tags: [] };
    fs.writeFileSync(databasePath, JSON.stringify(database));
    console.log('Database was created');
  }
};

const readDatabase = () => {
  if (!fs.existsSync(databasePath)) {
    throw new Error('Database does not exists');
  }

  const data = fs.readFileSync(databasePath, 'utf8');
  return JSON.parse(data);
};

const writeToDatabase = async (database: Databases, data: IUser[] | IPhoto[] | ITag[]) => {
  const dbData = readDatabase();

  return fs.writeFileSync(
    databasePath,
    JSON.stringify({
      ...dbData,
      [database]: [...dbData[database], ...data],
    })
  );
};

const orm = {
  databaseInit,
  databasePath,
  writeToDatabase,
  readDatabase,
};

export { User, Tag, Photo, orm };
