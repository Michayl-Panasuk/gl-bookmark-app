import { idGenerator } from 'src/app/utils';

export class Bookmark {
  constructor(
    public url: string,
    public group: string,
    public id = idGenerator(),
  ) {}
}
