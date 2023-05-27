import GenericError from '../../factories/generic.error'

class Unauthorized extends GenericError {
  public readonly statusCode: number = 401
}

export default Unauthorized
