import { connect } from 'react-redux'
import { increment, doubleAsync, searchUser, setUserList, setMessage } from '../modules/search'

import Search from '../components/Search'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  searchUser,
  setUserList,
  setMessage
}

const mapStateToProps = (state) => ({
  search : state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
