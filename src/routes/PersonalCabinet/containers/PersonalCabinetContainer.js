import { connect } from 'react-redux'
import { doubleAsync, fetchPersonalCabinetInfo } from '../modules/personalCabinet'

import PersonalCabinet from '../components/PersonalCabinet'

const mapDispatchToProps = {
  fetchPersonalCabinetInfo,
  doubleAsync
}

const mapStateToProps = (state) => ({
  personalCabinet : state.personalCabinet
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCabinet)
