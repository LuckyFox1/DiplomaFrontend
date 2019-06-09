import { connect } from 'react-redux'
import { doubleAsync, fetchPersonalCabinetInfo } from '../modules/patientProfile'

import PatientProfile from '../components/PatientProfile'

const mapDispatchToProps = {
  fetchPersonalCabinetInfo,
  doubleAsync
}

const mapStateToProps = (state) => ({
  patientProfile : state.patientProfile
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)
