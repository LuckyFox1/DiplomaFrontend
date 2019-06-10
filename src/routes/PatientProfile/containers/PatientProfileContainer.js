import { connect } from 'react-redux'
import { fetchPatientProfileInfo } from '../modules/patientProfile'

import PatientProfile from '../components/PatientProfile'

const mapDispatchToProps = {
  fetchPatientProfileInfo
}

const mapStateToProps = (state) => ({
  patientProfile : state.patientProfile
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)
