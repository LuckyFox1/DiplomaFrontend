import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/hospital'

import Hospital from '../components/Hospital'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  hospital : state.hospital
})

export default connect(mapStateToProps, mapDispatchToProps)(Hospital)
