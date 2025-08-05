import { Category } from '@/domain/model/';
import { ICategoryRepository } from '@/domain/repositories/';

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Map<string, Category> = new Map();

  constructor() {
    this.save(new Category('cat-1', 'Housing'));
    this.save(new Category('cat-2', 'Food'));
    this.save(new Category('cat-3', 'Transportation'));
    console.log('InMemoryCategoryRepository initialized and populated.');
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.get(id);
    return category || null;
  }

  async save(category: Category): Promise<void> {
    this.categories.set(category.id, category);
  }
}
