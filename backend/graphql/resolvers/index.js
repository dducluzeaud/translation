import authResolver from './auth'
import fileResolver from './file'
import tranlsationResolver from './translation'

const rootResolver = {
  ...authResolver,
  ...fileResolver,
  ...tranlsationResolver,
}

export default rootResolver
