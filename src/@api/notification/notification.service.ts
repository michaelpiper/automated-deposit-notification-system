import NotificationModel, { type NotificationDocument } from './notification.model'
import { QueueNotification } from '../../workers/pots/notification.worker'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import idp from '../../common/sdk/idp'
import { NotificationStatus, NotificationType } from '../../common/interfaces/notification.interface'
import { type Job } from 'kue'
import { type IUser } from '../../common/interfaces/user.interface'
import wallet from '../../common/sdk/wallet'
import { ObjectId } from 'mongodb'
import { isValidObjectId } from 'mongoose'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'
import { mailer } from '../../common/connections/mail'
// import { type AxiosError } from 'axios'
export class NotificationService {
  async create (userId: string, amount: number, notificationType: NotificationType, reference: string) {
    const isExist = await this.findOneByReference(reference) != null
    if (isExist) {
      throw new BadRequest(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'Reference with this request already exist')
    }
    return await NotificationModel.create({
      userId,
      amount,
      type: notificationType,
      reference
    })
  }

  async updateStatus (id: ObjectId, status: NotificationStatus) {
    if (!isValidObjectId(id)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return await NotificationModel.updateOne({
      _id: id
    }, {
      $set: {
        status
      }
    }).exec()
  }

  findOneById (id: string) {
    if (!isValidObjectId(id)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return NotificationModel.findOne({
      _id: new ObjectId(id)
    })
  }

  findOneByReference (reference: string) {
    return NotificationModel.findOne({
      reference
    })
  }

  async queueNotification (notificationId: ObjectId): Promise<Job> {
    return await QueueNotification(notificationId)
  }

  async sendNotification (notification: NotificationDocument) {
    const [userInfo, walletBalance] = await Promise.all([this.fetchUserInfo(notification.userId), this.checkWalletBalanceByUserId(notification.userId)])
    console.log('Notification data fetch over microservice', userInfo, walletBalance)
    if (userInfo != null && walletBalance < notification.amount) {
      const message = `Dear ${userInfo.name}, your automated deposit of ${notification.amount as unknown as string} failed due to insufficient funds in your wallet. Please add funds to your wallet to resolve the issue.`
      console.log(notification.type)
      if (notification.type === NotificationType.mobile.toString()) {
        await this.sendMobileNotification(userInfo.deviceNotificationToken, message)
      } else if (notification.type === NotificationType.email.toString()) {
        await this.sendEmailNotification(userInfo.email, message)
      }
      await this.updateStatus(notification.id, NotificationStatus.completed)
      console.log('Notification sent. Insufficient funds.')
    } else {
      console.log('No notification sent. Sufficient funds available.')
      await this.updateStatus(notification.id, NotificationStatus.ignored)
    }
  }

  // Fetches user information from the User Management microservice
  async fetchUserInfo (userId: ObjectId): Promise<IUser> {
    try {
      const response = await idp.get(`/users/${userId.toString()}`)
      return response.data?.data ?? {}
    } catch (error: any) {
      console.log('Error', wallet.defaults.baseURL)
      throw new BadRequest(ErrorCode.QUERY_EXCEPTION, ErrorDescription.QUERY_EXCEPTION, 'Failed to fetch user information').withRootError(error)
    }
  }

  // Checks  wallet balance using the User Wallet microservice
  async checkWalletBalanceByWalletId (walletId: ObjectId): Promise<number> {
    try {
      const response = await wallet.get(`/wallets/${walletId.toString()}/balance`)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return response.data || 0
    } catch (error: any) {
      throw new BadRequest(ErrorCode.QUERY_EXCEPTION, ErrorDescription.QUERY_EXCEPTION, 'Failed to check wallet balance').withRootError(error)
    }
  }

  // Checks the user's wallet balance using the User Wallet microservice
  async checkWalletBalanceByUserId (userId: ObjectId): Promise<number> {
    try {
      const response = await wallet.get(`/wallets/users/${userId.toString()}/balance`)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return response.data || 0
    } catch (error: any) {
      throw new BadRequest(ErrorCode.QUERY_EXCEPTION, ErrorDescription.QUERY_EXCEPTION, 'Failed to check wallet balance').withRootError(error)
    }
  }

  // Sends a mobile notification to the user
  async sendMobileNotification (deviceNotificationToken: string, message: string) {
    // Implementation using a mobile notification service
    // Replace with the actual implementation or use a third-party service
    console.log(`Sending mobile notification to device ${deviceNotificationToken}: ${message}`)
  }

  // Sends an email notification to the user
  async sendEmailNotification (email: string, message: string) {
    // Implementation using an email service
    await mailer.sendMail({
      to: email,
      html: message
    })
    console.log(`Sending email notification to email ${email}: ${message}`)
  }
}
