import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PatientProfile.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'
// import { getParsedTime } from '../../../utils'

class PatientProfile extends Component {
  componentDidMount () {
    const { fetchPatientProfileInfo, params } = this.props

    fetchPatientProfileInfo(params.id)
  }

  render () {
    const { user, medicalNotes, message } = this.props.patientProfile
    console.log(this.props.patientProfile)

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
            </div>
          </div>
          : ''
      }
      {
        medicalNotes
          ? <div className={'medicalNotesWrapper'}>
            <div className='tableHeader'>
              <span className='date'>Дата</span>
              <span className='type'>Тип</span>
              <span className='doctor'>Лікар</span>
            </div>
            <ul className='notes list-group'>
              {
                medicalNotes.map(note => {
                  const { day, month, year } = note.date

                  return <li key={note.type + note.consultationID} className='list-group-item rounded-0'>
                    <span className='date'>{day}.{month}.{year}</span>
                    <span className='type'>{note.type}</span>
                    <span className='doctor'>{note.fullName}</span>
                    <button className='btn btn-light right'>Детальніше</button>
                  </li>
                })
              }
            </ul>
          </div>
          : ''
      }
      {
        message
          ? <div>
            <div className='tableHeader'>
              <span className='date'>Дата</span>
              <span className='type'>Тип</span>
              <span className='doctor'>Лікар</span>
            </div>
            <div>{message}</div>
          </div> : ''
      }
    </div>
  }
}

PatientProfile.propTypes = {
  fetchPatientProfileInfo: PropTypes.func,
  patientProfile: PropTypes.object,
  params: PropTypes.object
}

export default PatientProfile
