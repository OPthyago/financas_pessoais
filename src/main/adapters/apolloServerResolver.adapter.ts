import { IController, HttpRequest } from "@/infra/controllers";

export const adaptResolver = (controller: IController) => {
  return async (_parent: any, args: any) => {
    const httpRequest: HttpRequest = {
      params: args
    }

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return httpResponse.body;
    }

    throw new Error(httpResponse.body);
  }
};
