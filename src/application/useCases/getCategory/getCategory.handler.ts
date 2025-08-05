import { ICategoryRepository } from '@/domain/repositories/';
import { IQueryHandler } from '@/application/shared/';
import { GetCategoryQuery } from './getCategory.query';
import { Category } from '@/domain';

export class GetCategoryQueryHandler
  implements IQueryHandler<GetCategoryQuery, Category | null> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(query: GetCategoryQuery): Promise<Category | null> {
    const category = await this.categoryRepository.findById(query.id);

    return category ? category : null;
  }
}
