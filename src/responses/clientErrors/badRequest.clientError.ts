import GenericError from '../../factories/generic.error'

class BadRequest extends GenericError {
  public readonly statusCode: number = 400
}

export default BadRequest
