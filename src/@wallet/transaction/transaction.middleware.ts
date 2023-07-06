import { type Response, type NextFunction, type Request } from 'express'
import { handleRetrieveUserWalletTransaction, handleRetrieveUserTransaction } from './transaction.validation'
import { ValidationError } from 'joi'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import UnprocessableEntity from '../../responses/clientErrors/unprocessableEntity.clientError'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { UserService } from '../../@idp/user/user.service'
import NotFound from '../../responses/clientErrors/notFound.clientError'
import { TransactionService } from './transaction.service'
export class TransactionMiddleware {
  async handleRetrieveUserTransactionValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.params = await handleRetrieveUserTransaction.validateAsync(req.params)
      next()
    } catch (error: any) {
      if (error instanceof ValidationError) {
        next(new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error))
      }
      next(new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error))
    }
  }

  async handleRetrieveUserWalletTransactionValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      req.params = await handleRetrieveUserWalletTransaction.validateAsync(req.params)
      next()
    } catch (error: any) {
      if (error instanceof ValidationError) {
        next(new UnprocessableEntity(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, error.details).withRootError(error))
      }
      next(new BadRequest(ErrorCode.UNEXPECTED_ERROR, ErrorDescription.UNEXPECTED_ERROR, 'An unexpected events occurs please contact site admin').withRootError(error))
    }
  }

  async userExist (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService = new UserService()
      res.locals.user = await userService.findOneById(req.params.userId)

      if (res.locals.user === null) {
        throw new NotFound(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'The userId doesn\'t exit')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

  async walletExist (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const walletService = new TransactionService()
      res.locals.wallet = await walletService.findOneById(req.params.walletId)
      if (res.locals.wallet === null) {
        throw new NotFound(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'The walletId doesn\'t exit')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
