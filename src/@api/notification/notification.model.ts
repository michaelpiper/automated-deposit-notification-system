import { Schema, type HydratedDocument } from 'mongoose'
import { MongooseAdapter } from '../../common/connections'
import { NotificationType, type INotification, NotificationStatus } from '../../common/interfaces/notification.interface'
export { NotificationType, type INotification } from '../../common/interfaces/notification.interface'

export const notificationSchema = new Schema<INotification>({
  reference: String,
  userId: Schema.Types.ObjectId,
  amount: Number,
  status: {
    type: String,
    values: Object.values(NotificationStatus),
    default: NotificationStatus.pending
  },
  type: {
    type: String,
    values: Object.values(NotificationType),
    required: true
  }
})
export const NotificationModel = MongooseAdapter.connection.model<INotification>('Notification', notificationSchema)
export type NotificationDocument = HydratedDocument<INotification>
export default NotificationModel
