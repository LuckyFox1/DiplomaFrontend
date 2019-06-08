import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'lab',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Lab = require('./containers/LabContainer').default
      const reducer = require('./modules/lab').default

      injectReducer(store, { key: 'lab', reducer })

      cb(null, Lab)
    }, 'lab')
  }
})
