import { type ParsedQs } from 'qs'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'
import { ErrorCode, ErrorDescription } from '../constants'
import { type IPaginationResult } from '../interfaces/pagination.interface'

export class PaginationDto {
  #count?: number
  constructor (public page: number = 1, public limit: number = 10, public sort: string | null = null, public sortAsc = true) { }
  static fromQuery (query: ParsedQs) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return new this(Number(query.page) || 1, Number(query.limit) || 10, query.sort as string, !(query.sortAsc === 'false' || (query as any).sortAsc === false))
  }

  getLimit (): number {
    return this.limit * 1
  }

  getSkip (): number {
    return (this.page - 1) * this.limit
  }

  getTotalPages (): number {
    this.ensureCount()
    return Math.ceil(this.#count as number / this.getLimit())
  }

  setCount (count: number) {
    this.#count = count
  }

  ensureCount () {
    if (this.#count === undefined) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please ensure to call setCount before using getTotalPages(), buildResult(')
    }
  }

  buildResult <T>(result: T []): IPaginationResult<T> {
    return {
      page: {
        count: this.#count as number,
        currentPage: this.page,
        totalPages: this.getTotalPages()
      },
      items: result
    }
  }
}
