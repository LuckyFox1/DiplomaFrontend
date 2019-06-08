import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Schedule.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'

class Schedule extends Component {
  componentDidMount() {
    const {fetchDoctorSchedule, params} = this.props

    fetchDoctorSchedule(params.id)
  }

  render() {
    const {toggleSchedule} = this.props
    const {user, scheduleIsOpened, receptions} = this.props.schedule
    const dateOfBirth = user ? user.dateOfBirth : {}
    let startWorkDay, endWorkDay, startDinner, endDinner

    if (user) {
      startWorkDay = user.startWorkDay
      endWorkDay = user.endWorkDay
      startDinner = user.startDinner
      endDinner = user.endDinner
    }

    return <div className='scheduleContainer'>
      {
        user
          ? <div className='personalInfo'>
            <div className='photoWrapper left'>
              <div className='photo'>
                {
                  !user.image
                    ? <img src={UserIconPlaceholder} alt='User photo'/>
                    : <img src={user.image} alt='User photo'/>
                }
              </div>
            </div>
            <div className='infoWrapper right'>
              <h4 className='fullName'>{user.surname} {user.name} {user.patronymic}</h4>
              <div className='info'>Стать: {user.gender}</div>
              <div className='info'>Дата народження: {dateOfBirth.day}.{dateOfBirth.month}.{dateOfBirth.year}</div>
              <div className='info'>Посада: {user.position}</div>
              <div className='info'>Кабінет: №{user.roomNumber}</div>
              <div className='info'>
                Графік роботи: {startWorkDay.hours}:{startWorkDay.minutes} - {endWorkDay.hours}:{endWorkDay.minutes}
              </div>
              <div className='info'>
                Обідня перерва: {startDinner.hours}:{startDinner.minutes} - {endDinner.hours}:{endDinner.minutes}
              </div>
              <button
                className={`btn btn-light viewSchedule ${scheduleIsOpened ? 'active' : ''}`}
                onClick={() => toggleSchedule(!scheduleIsOpened)}
              >
                Переглянути графік
              </button>
            </div>
          </div> : ''
      }
      {
        scheduleIsOpened && receptions
          ? <div className={'scheduleWrapper'}>
            <h4 className='title'>Графік прийомів</h4>
            {
              user.byOrder
                ? <div className={'schedule'}>
                  {
                    receptions.map(reception => {
                      return <button className={'btn btn-primary'}>
                        {reception.hours}:{reception.minutes}
                      </button>
                    })
                  }
                </div>
                : <div>
                  До даного лікаря немає можливості записатись на прийом, але ви можете потрапити до нього в умовах
                  живої черги в робочі години.
                </div>
            }
          </div>
          : ''
      }
    </div>
  }
}

Schedule.propTypes = {
  fetchDoctorSchedule: PropTypes.func,
  schedule: PropTypes.object,
  params: PropTypes.object,
  toggleSchedule: PropTypes.func,
}

export default Schedule
