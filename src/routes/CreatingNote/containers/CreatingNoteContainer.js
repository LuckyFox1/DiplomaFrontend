import { connect } from 'react-redux'
import { getLabsForms, toggleActiveForm } from '../modules/creatingNote'

import CreatingNote from '../components/CreatingNote'

const mapDispatchToProps = {
  getLabsForms,
  toggleActiveForm
}

const mapStateToProps = (state) => ({
  creatingNote : state.creatingNote
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatingNote)
