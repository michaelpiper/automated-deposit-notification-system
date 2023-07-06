import { type ITransaction, TransactionType } from '../../common/interfaces/transaction.interface'
export class TransactionCreateReqDto {
  constructor (public txRef: string, public origin: string, public destination: string, public amount: number, public type: TransactionType) { }

  static fromRepository (data: ITransaction<string>) {
    const type = Object.values(TransactionType).find((n) => n.toString() === data.type) as TransactionType
    return new this(
      data.txRef,
      data.originId.toString(),
      data.destinationId.toString(),
      data.amount,
      type
    )
  }

  static fromPayload (data: Record<string, any>) {
    const type = Object.values(TransactionType).find((n) => n.toString() === data.type) as TransactionType
    return new this(
      data.txRef,
      data.origin,
      data.destination,
      data.amount,
      type
    )
  }
}
export class TransactionRetrievalReqDto {
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

  static fromWithUserTransactionPayload (data: Record<string, any>) {
    return new this(
      data.userId
    )
  }

  static fromWithTransactionPayload (data: Record<string, any>) {
    return new this(
      data.walletId
    )
  }
}
export class TransactionRetrievalResDto {
  constructor (
    public id: string,
    public txRef: string,
    public origin: string,
    public destination: string,
    public amount: number,
    public type: TransactionType
  ) { }

  static fromRepository (data: ITransaction<string>) {
    const type = Object.values(TransactionType).find((n) => n.toString() === data.type) as TransactionType
    return new this(
      data.id,
      data.txRef,
      data.originId.toString(),
      data.destinationId.toString(),
      data.amount,
      type
    )
  }

  get data () {
    return {
      id: this.id,
      txRef: this.txRef,
      origin: this.origin.toString(),
      destination: this.destination.toString(),
      amount: this.amount
    }
  }

  static fromPayload (data: Record<string, any>) {
    return new this(
      data.id,
      data.txRef,
      data.origin.toString(),
      data.destination.toString(),
      data.amount,
      data.type
    )
  }
}

export class TransactionCreateResDto extends TransactionRetrievalResDto {

}
