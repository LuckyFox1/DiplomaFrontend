import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'personalCabinet',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PersonalCabinet = require('./containers/PersonalCabinetContainer').default
      const reducer = require('./modules/personalCabinet').default

      injectReducer(store, { key: 'personalCabinet', reducer })

      cb(null, PersonalCabinet)

    }, 'personalCabinet')
  }
})
