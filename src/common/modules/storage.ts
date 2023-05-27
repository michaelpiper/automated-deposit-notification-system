
export abstract class BaseStorageAdapter<T = any, C = any> {
  protected _connection?: T
  protected _defaultConnection: any
  protected config: C = {} as unknown as C

  abstract defaultConfig (): Partial<C> | C
  abstract createConnection (options: C): T

  get defaultConnection () {
    return this._defaultConnection
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  set defaultConnection (defaultConnection) {
    this._defaultConnection = defaultConnection
  }

  ensure (adapter?: this) {
    if (adapter?.connection !== undefined && adapter?.connection !== null) {
      return adapter.connection
    }
    if (this._defaultConnection !== null) {
      return this._defaultConnection
    }
    throw new Error('Please pass a connection instance to this method or initialize a default connection in storage adapter')
  }

  initialize (options?: C, makeDefault?: boolean) {
    this.config = (options !== null && options !== undefined ? options : this.defaultConfig()) as C
    this.connection = this.createConnection(this.config)
    if (makeDefault === true) {
      this.defaultConnection = this._connection
    }
    return this
  }

  get connection (): T {
    return this._connection as T
  }

  set connection (conn) {
    this._connection = conn
  }

  clone (options?: C) {
    const CloneStorage = this.constructor as new () => this
    return (new CloneStorage()).initialize(Object.assign(Object.assign({}, this.config), options))
  }
}
