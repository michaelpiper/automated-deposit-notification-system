import { type Response, type NextFunction, type Request } from 'express'
import { NotificationService } from './notification.service'
import SuccessArtifact from '../../responses/artifacts/success.artifact'
import { NotificationCreateReqDto, NotificationRetrievalReqDto, NotificationRetrievalResDto } from './notification.dto'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import NotFound from '../../responses/clientErrors/notFound.clientError'

export class NotificationController {
  async handleDepositNotification (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = NotificationCreateReqDto.fromPayload(req.body)
      const service = new NotificationService()
      const notification = await service.create(payload.userId, payload.amount, payload.type, payload.reference)
      await service.queueNotification(notification.id)
      res.json(new SuccessArtifact({
        notificationId: notification.id
      }).toJson)
    } catch (error) {
      // console.log(error)
      next(error !== null ? error : new BadRequest(ErrorCode.CLIENT_EXCEPTION, ErrorDescription.CLIENT_EXCEPTION, 'Error also'))
    }
  }

  async retrieve (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = NotificationRetrievalReqDto.fromPayload(req.params)
      const service = new NotificationService()
      const notification = await service.findOneById(payload.id)
      if (notification === null) {
        throw new NotFound(ErrorCode.NOT_FOUND, ErrorDescription.NOT_FOUND, `User not found ${payload.id}`)
      }
      res.json(new SuccessArtifact(NotificationRetrievalResDto.fromRepository(notification).data).toJson)
    } catch (error) {
      // console.log(error)
      next(error !== null ? error : new BadRequest(ErrorCode.CLIENT_EXCEPTION, ErrorDescription.CLIENT_EXCEPTION, 'Error occured'))
    }
  }
}
