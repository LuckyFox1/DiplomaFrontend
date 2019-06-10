import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/creatingNote',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CreatingNote = require('./containers/CreatingNoteContainer').default
      const reducer = require('./modules/creatingNote').default

      injectReducer(store, { key: 'creatingNote', reducer })

      cb(null, CreatingNote)
    }, 'creatingNote')
  }
})
