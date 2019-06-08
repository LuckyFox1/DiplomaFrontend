import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/schedule'

import Schedule from '../components/Schedule'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  schedule : state.schedule
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
