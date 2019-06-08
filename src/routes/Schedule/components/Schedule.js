import React, { Component } from 'react'
import './Schedule.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'

class Schedule extends Component {
  componentDidMount() {

  }

  render () {
    console.log(this.props)
    return <div className='schedule'>
      <div className='personalInfo'>
        <div className='photoWrapper left'>
          <div className='photo'>
            {
              !image
                ? <img src={UserIconPlaceholder} alt='User photo'/>
                : <img src={image} alt='User photo'/>
            }
          </div>
        </div>
        <div className='infoWrapper right'>
          <h4 className='fullName'>{surname} {name} {patronymic}</h4>
          <div className='info'>Стать: {gender}</div>
          <div className='info'>Дата народження: {day}.{month}.{year}</div>
          <div className='info'>Посада: {position}</div>
          <div className='info'>Кабінет: №{roomNumber}</div>
          <button className='btn btn-light'>Відкрити медичну картку</button>
        </div>
      </div>
    </div>
  }
}

Schedule.propTypes = {}

export default Schedule
