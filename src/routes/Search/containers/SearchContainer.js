import { connect } from 'react-redux'
import { searchUser, setUserList, setMessage } from '../modules/search'

import Search from '../components/Search'

const mapDispatchToProps = {
  searchUser,
  setUserList,
  setMessage
}

const mapStateToProps = (state) => ({
  search : state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
