import { connect } from 'react-redux'
import { loginUser } from '../modules/login'

import Login from '../components/Login'

const mapDispatchToProps = {
  loginUser
}

const mapStateToProps = (state) => ({
  login : state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
