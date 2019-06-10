import { connect } from 'react-redux'
import { getLabsForms, toggleActiveForm } from '../modules/lab'

import Lab from '../components/Lab'

const mapDispatchToProps = {
  getLabsForms,
  toggleActiveForm
}

const mapStateToProps = (state) => ({
  lab : state.lab
})

export default connect(mapStateToProps, mapDispatchToProps)(Lab)
