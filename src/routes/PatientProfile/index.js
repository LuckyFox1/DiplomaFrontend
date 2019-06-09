import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'patient/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PatientProfile = require('./containers/PatientProfileContainer').default
      const reducer = require('./modules/patientProfile').default

      injectReducer(store, { key: 'patientProfile', reducer })

      cb(null, PatientProfile)
    }, 'patientProfile')
  }
})
