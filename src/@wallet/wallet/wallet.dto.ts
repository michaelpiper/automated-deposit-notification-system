import { type IWallet, WalletType } from './wallet.model'
import { type ObjectId } from 'mongodb'
export class WalletRetrievalReqDto {
  constructor (public id: string) { }

  static fromRepository (data: Record<string, any>) {
    return new this(
      data.id
    )
  }

  static fromPayload (data: Record<string, any>) {
    return new this(
      data.id
    )
  }

  static fromWithUserWalletPayload (data: Record<string, any>) {
    return new this(
      data.userId
    )
  }

  static fromWithWalletPayload (data: Record<string, any>) {
    return new this(
      data.walletId
    )
  }
}
export class WalletCreateReqDto {
  constructor (public name: string, public type: WalletType, public email: string, public password: string, public mobileNotificationToken: string) { }

  static fromRepository (data: Record<string, any>) {
    const type = Object.values(WalletType).find((n) => n.toString() === data.type) as WalletType
    return new this(
      data.name,
      type,
      data.email,
      data.password,
      data.mobileNotificationToken
    )
  }

  static fromPayload (data: Record<string, any>) {
    const type = Object.values(WalletType).find((n) => n.toString() === data.type) as WalletType
    return new this(
      data.name,
      type,
      data.email,
      data.password,
      data.mobileNotificationToken
    )
  }
}

export class WalletRetrievalResDto {
  constructor (
    public id: string,
    public groupId: ObjectId,
    public type: WalletType,
    public value: number
  ) { }

  static fromRepository (data: IWallet<string>) {
    return new this(
      data.id,
      data.groupId,
      data.type,
      data.value
    )
  }

  get data () {
    return {
      id: this.id,
      groupId: this.groupId,
      type: this.type,
      value: this.value
    }
  }

  static fromPayload (data: Record<string, any>) {
    return new this(
      data.id,
      data.groupId,
      data.type,
      data.value
    )
  }
}
export class WalletBalanceRetrievalResDto {
  constructor (
    public balance: number
  ) { }

  get data () {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return this.balance || 0
  }

  static fromRepository (data: IWallet<string>) {
    return new this(
      data.value
    )
  }

  static fromPayload (data: Record<string, any>) {
    return new this(
      data.value
    )
  }
}

export class WalletCreateResDto extends WalletRetrievalResDto {

}
