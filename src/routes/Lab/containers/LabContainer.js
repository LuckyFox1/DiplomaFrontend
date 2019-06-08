import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/lab'

import Lab from '../components/Lab'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  lab : state.lab
})

export default connect(mapStateToProps, mapDispatchToProps)(Lab)
