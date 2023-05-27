import { type Response, type NextFunction, type Request } from 'express'
import { handleDepositNotification, handleRetrieveNotification } from './notification.validation'
import { ValidationError } from 'joi'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import UnprocessableEntity from '../../responses/clientErrors/unprocessableEntity.clientError'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { UserService } from '../../@idp/user/user.service'
import NotFound from '../../responses/clientErrors/notFound.clientError'
export class NotificationMiddleware {
  async handleDepositNotificationValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.body = await handleDepositNotification.validateAsync(req.body)
      next()
    } catch (error: any) {
      if (error instanceof ValidationError) {
        next(new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error))
      }
      next(new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error))
    }
  }

  async handleRetrieveNotificationValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.params = await handleRetrieveNotification.validateAsync(req.params)
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error)
      }
      throw new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error)
    }
    next()
  }

  async userExist (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService = new UserService()
      res.locals.user = await userService.findOneById(req.body.userId)

      if (res.locals.user === null) {
        throw new NotFound(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'The userId doesn\'t exit')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
