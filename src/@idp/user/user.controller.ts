import { type Response, type NextFunction, type Request } from 'express'
import { UserService } from './user.service'
import SuccessArtifact from '../../responses/artifacts/success.artifact'
import { UserCreateReqDto, UserCreateResDto, UserListReqDto, UserListResDto, UserRetrievalReqDto, UserRetrievalResDto } from './user.dto'
import NotFound from '../../responses/clientErrors/notFound.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import { WalletService } from '../../@wallet/wallet/wallet.service'

export default class UserController {
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = UserCreateReqDto.fromPayload(req.body)
      const service = new UserService()
      const walletService = new WalletService()
      const user = await service.create(payload)
      await walletService.findOrCreate(user.id as string)
      res.json(new SuccessArtifact(UserCreateResDto.fromRepository(user)).toJson)
    } catch (error) {
      next(error)
    }
  }

  async retrieve (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = UserRetrievalReqDto.fromPayload(req.params)
      const service = new UserService()
      const user = await service.findOneById(payload.userId)
      if (user === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `User not found ${payload.userId}`)
      }
      res.json(new SuccessArtifact(UserRetrievalResDto.fromRepository(user)).toJson)
    } catch (error) {
      next(error)
    }
  }

  async list (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = UserListReqDto.fromQuery(req.query)
      const service = new UserService()
      const users: UserListResDto<string> = new UserListResDto<string>(await service.paginate<string>(query))
      res.json(new SuccessArtifact(users.data).toJson)
    } catch (error) {
      next(error)
    }
  }
}
