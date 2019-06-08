import { connect } from 'react-redux'
import { increment, doubleAsync, fetchDoctorSchedule, toggleSchedule } from '../modules/schedule'

import Schedule from '../components/Schedule'

const mapDispatchToProps = {
  fetchDoctorSchedule,
  toggleSchedule,
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  schedule : state.schedule
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
