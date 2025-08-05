import { PrismaClient } from '@prisma/client';
import { PrismaCategoryRepository } from '@/infra/repositories';
import { Category } from '@/domain/model';

describe('PrismaCategoryRepository', () => {
  let prismaMock: any;
  let sut: PrismaCategoryRepository;

  beforeEach(() => {
    prismaMock = {
      category: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        findFirst: jest.fn()
      },
    };
    sut = new PrismaCategoryRepository(prismaMock as unknown as PrismaClient);
  });

  describe('findById', () => {
    it('should call prisma.category.findUnique with correct params and return the category', async () => {
      const categoryFromDb = { id: 'any_id', description: 'any_desc', createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      prismaMock.category.findUnique.mockResolvedValue(categoryFromDb);

      const result = await sut.findById('any_id');

      expect(prismaMock.category.findUnique).toHaveBeenCalledWith({ where: { id: 'any_id' } });
      expect(result).toEqual(new Category('any_id', 'any_desc'));
    });

    it('should return null if prisma.category.findUnique returns null', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      const result = await sut.findById('any_id');

      expect(result).toBeNull();
    });
  });

  describe('save', () => {
    it('should call prisma.category.upsert with the correct parameters', async () => {
      const categoryToSave = new Category('cat-id-1', 'Test Category');

      await sut.save(categoryToSave);

      expect(prismaMock.category.upsert).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.upsert).toHaveBeenCalledWith({
        where: {
          id: categoryToSave.id,
        },
        update: {
          description: categoryToSave.description,
        },
        create: {
          id: categoryToSave.id,
          description: categoryToSave.description,
        },
      });
    });

    it('should throw when a category already exists', async () => {
      const existingCategory = new Category('cat-id-2', 'Test');

      prismaMock.category.findFirst.mockResolvedValue(existingCategory);

      const promise = sut.save(new Category('cat-id-3', 'Test'));

      await expect(promise).rejects.toThrow('A category with description "Test" already exists');
    });
  });

});
