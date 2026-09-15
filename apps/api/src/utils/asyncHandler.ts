import type { NextFunction, Request, Response } from 'express';
import type { ControllerResponse } from '../utils/HttpResponse.js';

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<ControllerResponse | void>;

export function asyncHandler(handler: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next))
      .then((response) => {
        if (!response) {
          return;
        }

        if (response.status === 204) {
          res.status(204).send();
          return;
        }

        res.status(response.status).json(response.body);
      })
      .catch(next);
  };
}
