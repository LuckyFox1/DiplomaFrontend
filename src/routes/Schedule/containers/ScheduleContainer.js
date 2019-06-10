import { connect } from 'react-redux'
import { fetchDoctorSchedule, toggleSchedule } from '../modules/schedule'

import Schedule from '../components/Schedule'

const mapDispatchToProps = {
  fetchDoctorSchedule,
  toggleSchedule
}

const mapStateToProps = (state) => ({
  schedule : state.schedule
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
