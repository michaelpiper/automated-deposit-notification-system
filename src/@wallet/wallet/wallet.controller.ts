import { type Response, type NextFunction, type Request } from 'express'
import { WalletService } from './wallet.service'
import SuccessArtifact from '../../responses/artifacts/success.artifact'
import { WalletBalanceRetrievalResDto, WalletFundingReqDto, WalletRetrievalReqDto, WalletRetrievalResDto } from './wallet.dto'
import NotFound from '../../responses/clientErrors/notFound.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'

export class WalletController {
  async retrieve (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = WalletRetrievalReqDto.fromWithWalletPayload(req.params)
      const service = new WalletService()
      const wallet = await service.findOneById(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Wallet not found ${payload.id}`)
      }
      res.status(200).json(new SuccessArtifact(WalletRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }

  async fundWallet (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = WalletFundingReqDto.fromWithWalletPayload(req.params, req.body)
      const service = new WalletService()
      const wallet = await service.fundWallet(payload)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Wallet not found ${payload.walletId}`)
      }
      res.status(200).json(new SuccessArtifact(WalletRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }

  async retrieveBalance (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = WalletRetrievalReqDto.fromWithWalletPayload(req.params)
      const service = new WalletService()
      const wallet = await service.findOneById(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Wallet not found ${payload.id}`)
      }
      res.json(WalletBalanceRetrievalResDto.fromRepository(wallet).data)
    } catch (error) {
      next(error)
    }
  }

  async retrieveUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = WalletRetrievalReqDto.fromWithUserWalletPayload(req.params)
      const service = new WalletService()
      const wallet = await service.findOneByUserId(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Wallet not found ${payload.id}`)
      }
      res.json(new SuccessArtifact(WalletRetrievalResDto.fromRepository(wallet).data).toJson)
    } catch (error) {
      next(error)
    }
  }

  async retrieveUserBalance (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = WalletRetrievalReqDto.fromWithUserWalletPayload(req.params)
      const service = new WalletService()
      const wallet = await service.findOneByUserId(payload.id)
      if (wallet === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `Wallet not found ${payload.id}`)
      }
      res.json(WalletBalanceRetrievalResDto.fromRepository(wallet).data)
    } catch (error) {
      next(error)
    }
  }
}
