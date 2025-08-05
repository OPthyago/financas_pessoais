import { ICommandHandler } from "@/application/shared";
import { AddCategoryCommand } from "./addCategory.command";
import { ICategoryRepository } from "@/domain/repositories";
import { Category } from "@/domain";

export class AddCategoryHandler implements ICommandHandler<AddCategoryCommand, void> {
  constructor(
    private readonly repository: ICategoryRepository
  ) { }

  async execute(command: AddCategoryCommand): Promise<void> {
    const newCategory = new Category(command.id, command.description);
    await this.repository.save(newCategory);
  }
}
