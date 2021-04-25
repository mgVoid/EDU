import Builder from './controllers/Builder';
import { printRandomUserData } from './controllers/Analytics';
import { orm } from './models';

orm.databaseInit();

const usersCount = 3;
const photosCount = 5;
const tagsCount = 10;
const builder = new Builder(usersCount, photosCount, tagsCount);

(async () => {
  await builder.makeDatabase();
  await printRandomUserData();
})();
