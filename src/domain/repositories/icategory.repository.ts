import { Category } from "../model";

export interface ICategoryRepository {
  save(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
}
