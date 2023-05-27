import GenericError from '../../factories/generic.error'

class Forbidden extends GenericError {
  public readonly statusCode: number = 403
}

export default Forbidden
