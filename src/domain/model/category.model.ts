import { v4 as uuidv4 } from 'uuid';
export class Category {
  constructor(
    public readonly id: string,
    public readonly description: string,
  ) {
    this.id = this.id ? this.id : uuidv4();
  }
}
