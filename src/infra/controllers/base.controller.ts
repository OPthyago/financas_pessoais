import { ICommand, ICommandHandler, IQuery, IQueryHandler } from "@/application/shared";
import { HttpRequest, HttpResponse, IController } from "./protocols";

export abstract class BaseController implements IController {
  protected abstract execute(request: HttpRequest): Promise<HttpResponse>;

  public static forQuery<TQuery extends IQuery, TResult>(params: {
    queryHandler: IQueryHandler<TQuery, TResult>;
    mapToQuery: (request: HttpRequest) => TQuery;
  }): BaseController {
    return new class extends BaseController {
      protected async execute(request: HttpRequest): Promise<HttpResponse> {
        const query = params.mapToQuery(request);
        const result = await params.queryHandler.execute(query);

        if (result === null || (Array.isArray(result) && result.length === 0)) {
          return { statusCode: 404, body: { message: 'Not found.' } };
        }

        return this.ok(result);
      }
    }
  }

  public static forCommand<TCommand extends ICommand>(params: {
    commandHandler: ICommandHandler<TCommand, void>;
    mapToCommand: (request: HttpRequest) => TCommand;
    successStatusCode?: 200 | 201;
  }): BaseController {
    return new class extends BaseController {
      protected async execute(request: HttpRequest): Promise<HttpResponse> {
        const command = params.mapToCommand(request);
        await params.commandHandler.execute(command);
        return { statusCode: params.successStatusCode ?? 200, body: null };
      }
    }
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(request);
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: { message: 'An unexpected error occurred.' },
      };
    }
  }

  protected ok(data: any): HttpResponse {
    return { statusCode: 200, body: data };
  }
  protected created(): HttpResponse {
    return { statusCode: 201, body: null };
  }
  protected serverError(error: Error): HttpResponse {
    return { statusCode: 500, body: { message: error.message || 'An unexpected error occurred.' } };
  }
}
