import { Category } from "@/domain";
import { ICategoryRepository } from "@/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaCategoryRepository implements ICategoryRepository {

  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async save(category: Category): Promise<void> {
    const categoryOnDb = await this.prisma.category.findFirst({
      where: {
        description: {
          equals: category.description,
          mode: 'insensitive',
        },
        id: {
          not: category.id,
        },
      },
    });

    if (categoryOnDb) {
      throw new Error(`A category with description "${category.description}" already exists.`);
    }

    await this.prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: {
        description: category.description,
      },
      create: {
        id: category.id,
        description: category.description,
      },
    });
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    });
    if (!category) {
      return null;
    }

    return new Category(category.id, category.description);
  }
}
