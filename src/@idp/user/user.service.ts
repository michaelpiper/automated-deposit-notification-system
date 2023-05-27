import UserModel, { type IUser } from './user.model'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import { type UserListReqDto, type UserCreateReqDto } from './user.dto'
import { type IPaginationResult } from '../../common/interfaces/pagination.interface'
import { isValidObjectId } from 'mongoose'
import { ObjectId } from 'mongodb'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'

export class UserService {
  async create (dto: UserCreateReqDto) {
    await Promise.race([
      await this.findOneByUsername(dto.username).then((user) => {
        if (user !== null) {
          throw new BadRequest(
            ErrorCode.INVALID_INPUT,
            ErrorDescription.INVALID_INPUT,
            'User with this username already exist'
          )
        }
        return user
      }),
      await this.findOneByEmail(dto.email).then((user) => {
        if (user !== null) {
          throw new BadRequest(
            ErrorCode.INVALID_INPUT,
            ErrorDescription.INVALID_INPUT,
            'User with this email already exist'
          )
        }
        return user
      })
    ]).catch((error: any) => {
      throw error
    })

    // eslint-disable-next-line @typescript-eslint/return-await
    return await UserModel.create({
      ...dto
    })
  }

  findOneById (id: string) {
    if (!isValidObjectId(id)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return UserModel.findOne({
      _id: new ObjectId(id)
    })
  }

  async paginate <T extends string | null>(query: UserListReqDto): Promise<IPaginationResult<IUser<T>>> {
    const [result, count] = await Promise.all([
      UserModel.find()
        .limit(query.getLimit())
        .skip(query.getSkip())
        .exec(),
      UserModel.count().exec()
    ])

    query.setCount(count)
    return query.buildResult(result as Array<IUser<T>>)
  }

  findOneByUsername (username: string) {
    return UserModel.findOne({
      username
    })
  }

  findOneByEmail (email: string) {
    return UserModel.findOne({
      email
    })
  }
}
