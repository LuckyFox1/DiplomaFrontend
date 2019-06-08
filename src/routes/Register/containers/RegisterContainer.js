import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/register'

import Register from '../components/Register'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  register : state.register
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
