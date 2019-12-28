import authResolver from './auth'
import fileResolver from './file'

const rootResolver = {
  ...authResolver,
  ...fileResolver,
}

export default rootResolver
