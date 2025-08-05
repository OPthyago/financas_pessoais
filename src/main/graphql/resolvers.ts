import { adaptResolver } from '@/main/adapters/';
import {
  makeAddCategoryController,
  makeGetCategoryController
} from '@/main/factories';
import { prisma } from '@/main/config/prisma';

export default {
  Query: {
    category: adaptResolver(makeGetCategoryController(prisma)),
  },
  Mutation: {
    addCategory: adaptResolver(makeAddCategoryController(prisma))
  }
};
