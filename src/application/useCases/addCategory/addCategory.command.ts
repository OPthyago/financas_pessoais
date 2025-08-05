import { ICommand } from '@/application/shared/';

export class AddCategoryCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly description: string
  ) { }
}
