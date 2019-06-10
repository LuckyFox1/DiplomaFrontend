import { connect } from 'react-redux'
import { fetchRoomsInfo } from '../modules/hospital'

import Hospital from '../components/Hospital'

const mapDispatchToProps = {
  fetchRoomsInfo
}

const mapStateToProps = (state) => ({
  hospital : state.hospital
})

export default connect(mapStateToProps, mapDispatchToProps)(Hospital)
