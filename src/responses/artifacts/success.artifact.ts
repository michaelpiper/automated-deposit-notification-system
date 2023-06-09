import { type SuccessData } from '../../common/types'
import { type ISuccessResponse } from '../../common/interfaces/responses'

class SuccessArtifact {
  private readonly _statusCode: number = 200
  private readonly _message: string = 'success'
  private readonly _data: SuccessData

  constructor (data: SuccessData = null) {
    this._data = data
  }

  get toJson (): ISuccessResponse {
    const response: ISuccessResponse = {
      status: this._statusCode,
      message: this._message
    }

    if (this._data === null) {
      return response
    }

    return {
      status: this._statusCode,
      message: this._message,
      data: this._data
    }
  }
}

export default SuccessArtifact
