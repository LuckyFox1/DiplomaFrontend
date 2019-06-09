import { connect } from 'react-redux'
import { increment, doubleAsync, fetchRoomsInfo } from '../modules/hospital'

import Hospital from '../components/Hospital'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  fetchRoomsInfo
}

const mapStateToProps = (state) => ({
  hospital : state.hospital
})

export default connect(mapStateToProps, mapDispatchToProps)(Hospital)
