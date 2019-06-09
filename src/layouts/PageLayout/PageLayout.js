import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { getCookie } from '../../utils'
import cn from 'classnames'
import { DOCTOR_ROLE, PATIENT_ROLE } from '../../constants'
import {removeCookie} from "../../routes/Login/utils";

class PageLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: getCookie('userID'),
      userRole: getCookie('userRole')
    }
  }

  updateState = () => {
    this.setState({
      userID: getCookie('userID'),
      userRole: getCookie('userRole')
    })
  }

  logout = () => {
    removeCookie('userID')
    removeCookie('userRole')
    this.updateState()
    console.log(this.state)
  }

  render () {
    const { children } = this.props
    const { userID, userRole } = this.state
    if (userID !== getCookie('userID') || userRole !== getCookie('userRole')) {
      this.updateState()
    }
    const loggedOutCn = cn({
      rightLinks: true,
      loggedOut: true,
      show: !userID && !userRole
    })
    const loggedInDoctorCn = cn({
      rightLinks: true,
      loggedInDoctor: true,
      show: userID && userRole === DOCTOR_ROLE
    })
    const loggedInPatientCn = cn({
      rightLinks: true,
      loggedInPatient: true,
      show: userID && userRole === PATIENT_ROLE
    })
    console.log(userID, userRole, !userID && !userRole)

    return <div className='container text-center'>
      <div className='header'>
        <IndexLink to='/' className='link mainPage'>ІС гінекологічного відділення</IndexLink>

        <div className={loggedOutCn}>
          <Link to='/register' className='link register' activeClassName='page-layout__nav-item--active'>
            Зареєструватись
          </Link>
          <Link to='/login' className='link login' activeClassName='page-layout__nav-item--active'>Увійти</Link>
        </div>

        <div className={loggedInDoctorCn}>
          <Link to='/search' className='link search' activeClassName='page-layout__nav-item--active'>
            Пошук
          </Link>
          <Link to='/lab' className='link lab' activeClassName='page-layout__nav-item--active'>
            Лабораторія
          </Link>
          <Link to='/hospital' className='link hospital' activeClassName='page-layout__nav-item--active'>
            Стаціонар
          </Link>
          <Link
            to='/personalCabinet'
            className='link personalCabinet'
            activeClassName='page-layout__nav-item--active'
          />
          <Link to='#' className='link logout' onClick={this.logout}>Вийти</Link>
        </div>

        <div className={loggedInPatientCn}>
          <Link to='/search' className='link search' activeClassName='page-layout__nav-item--active'>
            Пошук
          </Link>
          <Link to='/medicalCard' className='link search' activeClassName='page-layout__nav-item--active'>
            Медична карта
          </Link>
          <Link
            to='/personalCabinet'
            className='link personalCabinet'
            activeClassName='page-layout__nav-item--active'
          />
          <Link to='#' className='link logout' onClick={this.logout}>Вийти</Link>
        </div>

      </div>
      <div className='page-layout__wrapper'>
        <div className='page-layout__viewport'>
          {children}
        </div>
      </div>
    </div>
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
