import { connect } from 'react-redux'
import { increment, doubleAsync, getMedicalCard } from '../modules/medicalCard'

import MedicalCard from '../components/MedicalCard'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  getMedicalCard
}

const mapStateToProps = (state) => ({
  medicalCard : state.medicalCard
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalCard)
