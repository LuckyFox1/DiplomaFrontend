import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'hospital',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Hospital = require('./containers/HospitalContainer').default
      const reducer = require('./modules/hospital').default

      injectReducer(store, { key: 'hospital', reducer })

      cb(null, Hospital)
    }, 'hospital')
  }
})
