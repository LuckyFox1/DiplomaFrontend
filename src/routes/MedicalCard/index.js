import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'medicalCard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MedicalCard = require('./containers/MedicalCardContainer').default
      const reducer = require('./modules/medicalCard').default

      injectReducer(store, { key: 'medicalCard', reducer })

      cb(null, MedicalCard)
    }, 'personalCabinet')
  }
})
