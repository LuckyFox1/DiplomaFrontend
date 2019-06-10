import { connect } from 'react-redux'
import { fetchPersonalCabinetInfo } from '../modules/personalCabinet'

import PersonalCabinet from '../components/PersonalCabinet'

const mapDispatchToProps = {
  fetchPersonalCabinetInfo
}

const mapStateToProps = (state) => ({
  personalCabinet : state.personalCabinet
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCabinet)
