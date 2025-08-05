import { ICommandHandler } from "@/application/shared";
import { AddCategotyCommand } from "./addCategoty.command";
import { ICategoryRepository } from "@/domain/repositories";
import { Category } from "@/domain";

export class AddCategoryHandler implements ICommandHandler<AddCategotyCommand, void> {
  constructor(
    private readonly repository: ICategoryRepository
  ) { }

  async execute(command: AddCategotyCommand): Promise<void> {
    const category = await this.repository.findById(command.id);

    if (category) {
      throw new Error('Category already exists.');
    }

    const newCategory = new Category(command.id, command.description);
    await this.repository.save(newCategory);
  }
}
