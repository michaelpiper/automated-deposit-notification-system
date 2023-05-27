import { type ParsedQs } from 'qs'
import { PaginationDto } from '../../common/dto/pagination.dto'
import { type IUser, UserType } from './user.model'
import bcrypt from 'bcrypt'
import { type IPaginationResult } from '../../common/interfaces/pagination.interface'
export class UserRetrievalReqDto {
  constructor (public userId: string) { }

  static fromRepository (data: Record<string, any>) {
    return new this(
      data.userId
    )
  }

  static fromPayload (data: Record<string, any>) {
    return new this(
      data.userId
    )
  }
}
export class UserCreateReqDto {
  constructor (public name: string, public username: string, public type: UserType, public email: string, public phone: string, public password: string, public mobileNotificationToken: string) { }

  static fromRepository (data: Record<string, any>) {
    const type = Object.values(UserType).find((n) => n.toString() === data.type) as UserType
    return new this(
      data.name,
      data.username,
      type,
      data.email,
      data.phone,
      bcrypt.hashSync(data.password, 10),
      data.mobileNotificationToken
    )
  }

  static fromPayload (data: Record<string, any>) {
    const type = Object.values(UserType).find((n) => n.toString() === data.type) as UserType
    return new this(
      data.name,
      data.username,
      type,
      data.email,
      data.phone,
      bcrypt.hashSync(data.password, 10),
      data.mobileNotificationToken
    )
  }
}

export class UserListReqDto extends PaginationDto {
  static fromQuery (query: ParsedQs): PaginationDto {
    return super.fromQuery(query) as UserListReqDto
  }
}

export class UserListResDto<T> {
  #data!: IPaginationResult<IUser<T>>
  constructor (data: IPaginationResult<IUser<T>>) {
    this.#data = data
  }

  get data (): IPaginationResult<IUser<T>> {
    return {
      page: this.#data.page,
      items: this.#data.items.map((item) => (this.serialize(item)))
    }
  }

  serialize (item: IUser<T>): IUser<T> {
    return {
      id: item.id,
      name: item.name,
      username: item.username,
      deviceNotificationToken: item.deviceNotificationToken ?? null,
      email: item.email,
      phone: item.phone,
      type: item.type
    }
  }
}

export class UserRetrievalResDto {
  constructor (public id: string, public name: string, public username: string, public type: UserType, public email: string, public phone: string, public mobileNotificationToken: string) { }

  static fromRepository (data: Record<string, any>) {
    const type = Object.values(UserType).find((n) => n.toString() === data.type) as UserType
    return new this(
      data.id,
      data.name,
      data.username,
      type,
      data.email,
      data.phone,
      data.mobileNotificationToken
    )
  }

  static fromPayload (data: Record<string, any>) {
    const type = Object.values(UserType).find((n) => n.toString() === data.type) as UserType
    return new this(
      data.id,
      data.name,
      data.username,
      type,
      data.email,
      data.phone,
      data.mobileNotificationToken
    )
  }
}

export class UserCreateResDto extends UserRetrievalResDto {

}
