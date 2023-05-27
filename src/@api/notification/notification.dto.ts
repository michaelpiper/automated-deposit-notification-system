import { type ObjectId } from 'bson'
import { type NotificationStatus, type INotification } from '../../common/interfaces/notification.interface'
import { NotificationType } from './notification.model'

export class NotificationCreateReqDto {
  constructor (public userId: string, public amount: number, public type: NotificationType, public reference: string) {
  }

  static fromRepository (data: Record<string, any>): NotificationCreateReqDto {
    const notificationType = Object.values(NotificationType).find((n) => n.toString() === data.type) as NotificationType
    return new NotificationCreateReqDto(
      data.userId,
      data.amount,
      notificationType,
      data.reference
    )
  }

  static fromPayload (data: Record<string, any>): NotificationCreateReqDto {
    const notificationType = Object.values(NotificationType).find((n) => n.toString() === data.notificationType) as NotificationType
    return new NotificationCreateReqDto(
      data.userId,
      data.amount,
      notificationType,
      data.reference
    )
  }
}

export class NotificationRetrievalReqDto {
  constructor (public id: string) {

  }

  static fromPayload (data: Record<string, any>) {
    return new NotificationRetrievalReqDto(
      data.notificationId
    )
  }
}

export class NotificationRetrievalResDto<T extends string | ObjectId | null> implements INotification<T> {
  constructor (
    public id: T,
    public reference: string,
    public userId: ObjectId,
    public amount: number,
    public status: NotificationStatus,
    public type: NotificationType
  ) {}

  static fromRepository (data: Record<string, any>) {
    return new NotificationRetrievalResDto(
      data.id,
      data.reference,
      data.userId,
      data.amount,
      data.status,
      data.type
    )
  }

  get data () {
    return {
      id: this.id,
      status: this.status
    }
  }
}
