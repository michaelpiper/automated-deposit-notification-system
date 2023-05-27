import { type ObjectId } from 'mongodb'
export enum UserType {
  admin = 'admin',
  customer = 'customer'
}

export interface IUser<T = string | ObjectId | null> {
  id: T
  name: string
  username?: string
  email: string
  phone: string
  deviceNotificationToken: string
  type: UserType
}

export interface IProtectedUser extends IUser {
  password: string
}
