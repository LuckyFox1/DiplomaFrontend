import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './PersonalCabinet.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'
import {getParsedTime} from "../../../utils";

class PersonalCabinet extends Component {
  componentDidMount() {
    const { fetchPersonalCabinetInfo } = this.props

    fetchPersonalCabinetInfo()
  }

  render () {
    const { user, receptions } = this.props.personalCabinet
    let startWorkDay, endWorkDay, startDinner, endDinner

    if (user) {
      startWorkDay = getParsedTime(user.startWorkDay)
      endWorkDay = getParsedTime(user.endWorkDay)
      startDinner = getParsedTime(user.startDinner)
      endDinner = getParsedTime(user.endDinner)
    }

    return <div className='personalCabinet'>
      {
        user
          ? <div className='personalInfo'>
            <div className='photoWrapper left'>
              <div className='photo'>
                <img src={UserIconPlaceholder} alt='User photo'/>
              </div>
            </div>
            <div className='infoWrapper right'>
              <h4 className='fullName'>{user.surname} {user.name} {user.patronymic}</h4>
              <div className='id'>ID: {user.userID}</div>
              <div>Стать: {user.gender}</div>
              <div>Дата народження: {user.dateOfBirth.day}.{user.dateOfBirth.month}.{user.dateOfBirth.year}</div>
              <div>Телефон: {!user.phone ? 'Не вказано' : user.phone}</div>
              <div>Адрес: {!user.address ? 'Не вказано' : user.address} </div>
              {
                user.role === 'doctor'
                ? <div>
                  <div>Посада: {user.position}</div>
                  <div>Кімната: №{user.roomNumber}</div>
                  <div>
                    Графік роботи: {startWorkDay.hours}:{startWorkDay.minutes} - {endWorkDay.hours}:{endWorkDay.minutes}
                  </div>
                  <div>
                    Обідня перерва: {startDinner.hours}:{startDinner.minutes} - {endDinner.hours}:{endDinner.minutes}
                  </div>
                 </div> : ''
              }
            </div>
          </div>
          : ''
      }
      {
        receptions && user.role === 'patient'
          ? <div className='scheduleWrapper'>
            <h4 className='scheduleHeader'>Заплановані візити</h4>
            <ul className='schedule list-group'>
              {
                receptions.map(reception => {
                  let { day, month, year, hours, minutes } = reception.startReception
                  return <li key={reception.receptionID} className='list-group-item rounded-0'>
                    <span className='time'>
                      {day}.{month}.{year} {hours}:{minutes}
                    </span>
                    <span className='fullName'>
                      {reception.doctorsurname} {reception.doctorname} {reception.doctorpatronymic}
                    </span>
                    <span className='reason'>{reception.reason}</span>
                  </li>
                })
              }
            </ul>
          </div>
          : <div className='scheduleWrapper'>
            <h4 className='scheduleHeader'>Графік прийомів</h4>
            <ul className='schedule list-group'>
              {
                receptions && receptions.map(reception => {
                  const { startReception, endReception } = reception

                  return <li key={reception.receptionID} className='list-group-item rounded-0'>
                    <span className='time'>
                      {startReception.hours}:{startReception.minutes} - {endReception.hours}:{endReception.minutes}
                    </span>
                    <span className='fullName'>
                      {reception.patientsurname} {reception.patientname} {reception.patientpatronymic}
                    </span>
                    <button className='btn btn-light right'>Відкрити медичну карту</button>
                  </li>
                })
              }
            </ul>
          </div>
      }
    </div>
  }
}

PersonalCabinet.propTypes = {
  fetchPersonalCabinetInfo: PropTypes.func,
  personalCabinet: PropTypes.object
}

export default PersonalCabinet
