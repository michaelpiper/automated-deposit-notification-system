import NotFound from './clientErrors/notFound.clientError'
import GenericError from '../factories/generic.error'
import { type ICustomErrorResponse } from '../common/interfaces/responses.js'
import { type Request, type Response, type NextFunction } from 'express'
import { ErrorCode, ErrorDescription } from '../common/constants'
import InternalServerError from './serverErrors/internalServerError.serverError'

export const notFoundHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  errorHandler(
    new NotFound(
      ErrorCode.NOT_FOUND,
      ErrorDescription.NOT_FOUND,
     `The route "${req.url}" you try to view is currently not found or might have been moved permanently.`
    ), req, res, next)
}
export const errorHandler = (err: Error | ICustomErrorResponse, req: Request, res: Response, next: NextFunction): Response | void => {
  if (
    err instanceof GenericError
  ) {
    return reportCustomError(err, res)
  }
  return reportCustomError(new InternalServerError(ErrorCode.UNHANDLED_EXCEPTION, ErrorDescription.UNHANDLED_EXCEPTION, 'We Encounter an error while processing your request').withRootError(err as any), res)
}
const reportCustomError = (err: GenericError, res: Response): Response => {
  const { statusCode = 500 } = err
  if (err._cause !== undefined) {
    console.log(err.errorCode, ((err._cause as any)?.message) ?? '')
  }
  return res.status(statusCode).json(err)
}
