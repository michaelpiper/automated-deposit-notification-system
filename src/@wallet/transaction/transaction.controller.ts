import { type Response, type NextFunction, type Request } from 'express'
import { TransactionService } from './transaction.service'
import SuccessArtifact from '../../responses/artifacts/success.artifact'
import { TransactionRetrievalReqDto, TransactionRetrievalResDto } from './transaction.dto'
import NotFound from '../../responses/clientErrors/notFound.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'

export class TransactionController {
  async retrieve (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = TransactionRetrievalReqDto.fromWithTransactionPayload(req.params)
      const service = new TransactionService()
      const wallet = await service.findOneById(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Transaction not found ${payload.id}`)
      }
      res.status(200).json(new SuccessArtifact(TransactionRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }

  async retrieveUserWallet (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = TransactionRetrievalReqDto.fromWithTransactionPayload(req.params)
      const service = new TransactionService()
      const wallet = await service.findByOrigin(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Transaction not found ${payload.id}`)
      }
      res.json(new SuccessArtifact(TransactionRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }

  async retrieveUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = TransactionRetrievalReqDto.fromWithTransactionPayload(req.params)
      const service = new TransactionService()
      const wallet = await service.findByOrigin(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Transaction not found ${payload.id}`)
      }
      res.json(new SuccessArtifact(TransactionRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }
}
