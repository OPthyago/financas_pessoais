import { IQuery } from '@/application/shared/';

export class GetCategoryQuery implements IQuery {
  constructor(public readonly id: string) { }
}
