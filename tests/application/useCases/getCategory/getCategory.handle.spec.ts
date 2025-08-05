import { ICategoryRepository } from '@/domain/repositories';
import { GetCategoryQueryHandler, GetCategoryQuery } from '@/application/useCases';
import { Category } from '@/domain/model'
import { mock, MockProxy } from "jest-mock-extended";

const CATEGORY_ID = 'category_id';
const CATEGORY_DESCRIPTION = 'categoty_descriotion';

describe('GetCategoryHandler', () => {
  let sut: GetCategoryQueryHandler;
  let repository: MockProxy<ICategoryRepository>;
  let category: Category;

  beforeAll(() => {
    repository = mock();
    category = new Category(CATEGORY_ID, CATEGORY_DESCRIPTION);
  });

  beforeEach(() => {
    repository.findById.mockResolvedValue(category);
    sut = new GetCategoryQueryHandler(repository);
  });

  it('should return null when the category is not found', async () => {
    repository.findById.mockResolvedValueOnce(null);
    const command: GetCategoryQuery = {
      id: CATEGORY_ID
    };

    const returnedCategory = await sut.execute(command);

    expect(repository.findById).toHaveBeenCalledWith(CATEGORY_ID);
    expect(returnedCategory).toBeNull();
  });

  it('should return the category', async () => {
    const command: GetCategoryQuery = {
      id: CATEGORY_ID,
    };

    const returnedCategory = await sut.execute(command);

    expect(returnedCategory).toEqual(category);
  });
});
