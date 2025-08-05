import { BaseController } from '@/infra/controllers';
import { GetCategoryQuery, GetCategoryQueryHandler } from '@/application/useCases';
import { InMemoryCategoryRepository } from '@/infra/repositories/inMemoryCategory.repository';


export const makeGetCategoryController = (): BaseController => {
  const inMemoryCategoryRepository = new InMemoryCategoryRepository();
  const handler = new GetCategoryQueryHandler(inMemoryCategoryRepository);

  return BaseController.forQuery({
    queryHandler: handler,
    mapToQuery: (request) => new GetCategoryQuery(request.params.id)
  });
};
