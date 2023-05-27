import GenericError from '../../factories/generic.error'

class InternalServerError extends GenericError {
  public readonly statusCode: number = 500
}

export default InternalServerError
