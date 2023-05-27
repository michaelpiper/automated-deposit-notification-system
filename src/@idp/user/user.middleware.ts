import { type Response, type NextFunction, type Request } from 'express'
import { handleCreateUser, handleRetrieveUser } from './user.validation'
import { ValidationError } from 'joi'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import UnprocessableEntity from '../../responses/clientErrors/unprocessableEntity.clientError'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
export default class UserMiddleware {
  async handleRetrieveUserValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.body = await handleRetrieveUser.validateAsync(req.params)
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error)
      }
      throw new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error)
    }
    next()
  }

  async handleCreateUserValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.body = (await handleCreateUser.validateAsync(req.body))
    } catch (error: any) {
      if (error instanceof ValidationError) {
        next(new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error))
        return
      }
      next(new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error))
    }
    next()
  }
}
