import { BaseController } from '@/infra/controllers';
import { AddCategoryCommand, AddCategoryHandler } from '@/application/useCases';
import { PrismaCategoryRepository } from '@/infra/repositories';
import { PrismaClient } from '@prisma/client';

export const makeAddCategoryController = (prisma: PrismaClient): BaseController => {
  const repository = new PrismaCategoryRepository(prisma);
  const handler = new AddCategoryHandler(repository);

  return BaseController.forCommand({
    commandHandler: handler,
    mapToCommand: (request) => new AddCategoryCommand(
      request.params.id,
      request.params.description
    ),
    successStatusCode: 201
  });
};
