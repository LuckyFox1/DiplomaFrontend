import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Login.scss'
import cn from 'classnames'

class Login extends Component {
  render () {
    const { loginUser, login } = this.props
    const isError = !login.success && login.message.length

    return <div className='register'>
      <form>
        <div className='form-group'>
          <label htmlFor='login'>Логін</label>
          {
            isError ? <div className='invalid-feedback show right'>{login.message}</div> : ''
          }
          <input
            type='text'
            className={cn('form-control', { ['is-invalid']: isError })}
            id='login'
            placeholder='Логін'
            required
            ref={el => this.loginInput = el}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='inputPassword'>Пароль</label>
          <input
            type='password'
            className={cn('form-control', { ['is-invalid']: isError })}
            id='inputPassword'
            placeholder='Пароль'
            required
            ref={el => this.passwordInput = el}
          />
        </div>
        <button
          type='button'
          className='btn btn-primary registerBtn'
          onClick={() => loginUser(this.loginInput.value, this.passwordInput.value)}
        >
          Увійти
        </button>
      </form>
    </div>
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  login: PropTypes.object
}

export default Login
