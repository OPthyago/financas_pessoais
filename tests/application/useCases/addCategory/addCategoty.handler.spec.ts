import { ICategoryRepository } from '@/domain/repositories';
import { AddCategoryHandler, AddCategoryCommand } from '@/application/useCases';
import { Category } from '@/domain/model'
import { mock, MockProxy } from "jest-mock-extended";

const CATEGORY_ID = 'category_id';
const CATEGORY_DESCRIPTION = 'categoty_descriotion';

describe('AddCategoryHandler', () => {
  let sut: AddCategoryHandler;
  let repository: MockProxy<ICategoryRepository>;

  beforeAll(() => {
    repository = mock();
  });

  beforeEach(() => {
    repository.findById.mockResolvedValue(new Category(CATEGORY_ID, CATEGORY_DESCRIPTION));
    sut = new AddCategoryHandler(repository);
  });

  it('should add a new category', async () => {
    repository.findById.mockResolvedValueOnce(null);
    const command: AddCategoryCommand = {
      id: CATEGORY_ID,
      description: CATEGORY_DESCRIPTION
    };

    await sut.execute(command);

    expect(repository.save).toHaveBeenCalledWith(command);
  });

  it('should throw if the category already exists', async () => {
    const command: AddCategoryCommand = {
      id: CATEGORY_ID,
      description: CATEGORY_DESCRIPTION
    };

    const promise = sut.execute(command);

    expect(promise).rejects.toThrow('Category already exists.');
  });
});
