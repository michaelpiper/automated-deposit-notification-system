'use strict'
import expressServer from './server'
import { App } from '../../common/config'
const loader = (): Express.Application => {
  const PORT = App.WALLET_PORT
  return expressServer.listen(PORT, () => {
    console.log(`Wallet ${App.ENV} server started on port ${PORT}`)
  })
}
export default loader
