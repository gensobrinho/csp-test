export interface ControllerResponse<T = unknown> {
  status: number;
  body?: T;
}

export const HttpResponse = {
  ok<T>(body: T): ControllerResponse<T> {
    return { status: 200, body };
  },

  created<T>(body: T): ControllerResponse<T> {
    return { status: 201, body };
  },

  noContent(): ControllerResponse {
    return { status: 204 };
  },

  badRequest<T>(body: T): ControllerResponse<T> {
    return { status: 400, body };
  },

  unauthorized<T>(body: T): ControllerResponse<T> {
    return { status: 401, body };
  },

  notFound<T>(body: T): ControllerResponse<T> {
    return { status: 404, body };
  },
};
