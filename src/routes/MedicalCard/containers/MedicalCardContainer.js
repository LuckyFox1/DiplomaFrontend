import { connect } from 'react-redux'
import { getMedicalCard } from '../modules/medicalCard'

import MedicalCard from '../components/MedicalCard'

const mapDispatchToProps = {
  getMedicalCard
}

const mapStateToProps = (state) => ({
  medicalCard : state.medicalCard
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalCard)
