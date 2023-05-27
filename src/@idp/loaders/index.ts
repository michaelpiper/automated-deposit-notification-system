'use strict'
import expressServer from './server'
import { App } from '../../common/config'
const loader = (): Express.Application => {
  const PORT = App.IDP_PORT
  return expressServer.listen(PORT, () => {
    console.log(`IDP (ID Provider) ${App.ENV} server started on port ${PORT}`)
  })
}
export default loader
