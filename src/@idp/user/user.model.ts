import { Schema, type HydratedDocument } from 'mongoose'
import { MongooseAdapter } from '../../common/connections'
import { UserType, type IProtectedUser } from '../../common/interfaces/user.interface'
export { UserType, type IUser } from '../../common/interfaces/user.interface'

export const UserSchema = new Schema<IProtectedUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  deviceNotificationToken: { type: String, default: null },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: {
    type: String,
    values: Object.values(UserType),
    required: true
  }
})
export const UserModel = MongooseAdapter.connection.model<IProtectedUser>('User', UserSchema)
export type UserDocument = HydratedDocument<IProtectedUser>
export default UserModel
