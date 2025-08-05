import { ICommand } from '@/application/shared/';

export class AddCategotyCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly description: string
  ) { }
}
