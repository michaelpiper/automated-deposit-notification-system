'use strict'
import expressServer from './server'
import { App } from '../../common/config'
const loader = (): Express.Application => {
  const PORT = App.API_PORT
  return expressServer.listen(PORT, () => {
    console.log(`API ${App.ENV} server started on port ${PORT}`)
  })
}
export default loader
