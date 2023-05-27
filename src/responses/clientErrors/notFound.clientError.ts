import GenericError from '../../factories/generic.error'

class NotFound extends GenericError {
  public readonly statusCode: number = 404
}

export default NotFound
