import { connect } from 'react-redux'
import { increment, doubleAsync, getLabsForms, toggleActiveForm } from '../modules/lab'

import Lab from '../components/Lab'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  getLabsForms,
  toggleActiveForm
}

const mapStateToProps = (state) => ({
  lab : state.lab
})

export default connect(mapStateToProps, mapDispatchToProps)(Lab)
