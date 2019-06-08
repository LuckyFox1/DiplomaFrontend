import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'schedule/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Schedule = require('./containers/ScheduleContainer').default
      const reducer = require('./modules/schedule').default

      injectReducer(store, { key: 'schedule', reducer })

      cb(null, Schedule)
    }, 'schedule')
  }
})
