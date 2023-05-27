import GenericError from '../../factories/generic.error'

class UnprocessableEntity extends GenericError {
  public readonly statusCode: number = 422
}

export default UnprocessableEntity
