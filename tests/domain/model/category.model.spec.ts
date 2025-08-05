import { Category } from '@/domain';

describe('Category', () => {
  it('should be created correctly with an ID and a description', () => {
    const id = 'cat-id-1';
    const description = 'Housing';

    const category = new Category(id, description);

    expect(category.id).toBe(id);
    expect(category.description).toBe(description);
  });
});
