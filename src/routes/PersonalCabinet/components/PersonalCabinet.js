import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './PersonalCabinet.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'

class PersonalCabinet extends Component {
  componentDidMount() {
    const {fetchPersonalCabinetInfo} = this.props

    fetchPersonalCabinetInfo()
  }

  render() {
    const {user, receptions} = this.props.personalCabinet
    /*
    return <div className='personalCabinet'>
      <div className='personalInfo'>
        <div className='photoWrapper left'>
          <div className='photo'>
            <img src={UserIconPlaceholder} alt='User photo' />
          </div>
        </div>
        <div className='infoWrapper right'>
          <h4 className='fullName'>Іванова Антоніна Олексіївна</h4>
          <div className='id'>ID: 1</div>
          <div>Стать: жіноча</div>
          <div>Дата народження: 12.10.1989</div>
          <div>Телефон: 0664444123</div>
          <div>Адрес: м. Черкаси, вул. Чехова, буд. 23, кв. 46 </div>
        </div>
      </div>
      <div className='scheduleWrapper'>
        <h4 className='scheduleHeader'>Графік прийомів</h4>
        <ul className='schedule list-group'>
          <li className='list-group-item rounded-0'>
            <span className='time'>09:20 - 09:40</span>
            <span className='fullName'>Мусієнко Валентина Миколаївна</span>
            <button className='btn btn-light right'>Відкрити медичну карту</button>
          </li>
          <li className='list-group-item rounded-0'>
            <span className='time'>10:00 - 10:20</span>
            <span className='fullName'>Бондаренко Марина Іванівна</span>
            <button className='btn btn-light right'>Відкрити медичну карту</button>
          </li>
          <li className='list-group-item rounded-0'>
            <span className='time'>10:20 - 10:40</span>
            <span className='fullName'>Зобенко Дарина Андріївна</span>
            <button className='btn btn-light right'>Відкрити медичну карту</button>
          </li>
        </ul>
      </div>
    </div>
    */
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
        receptions
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
          : ''
      }
    </div>
  }
}

PersonalCabinet.propTypes = {
  fetchPersonalCabinetInfo: PropTypes.func,
  personalCabinet: PropTypes.object
}

export default PersonalCabinet
