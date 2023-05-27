import { type ObjectId } from 'mongodb'

export enum NotificationType {
  mobile = 'mobile',
  email = 'email'
}

export enum NotificationStatus {
  queue = 'queue',
  pending = 'pending',
  failed = 'failed',
  processing = 'processing',
  completed = 'completed',
  ignored = 'ignored'
}

export interface INotification<T = string | ObjectId | null> {
  id: T
  reference: string
  userId: ObjectId
  amount: number
  status: NotificationStatus
  type: NotificationType
}
