import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MedicalCard.scss'

class MedicalCard extends Component {
  componentDidMount () {
    const { getMedicalCard } = this.props

    getMedicalCard()
  }

  render () {
    const { medicalCard } = this.props
    console.log(medicalCard)

    return <div className='medicalCardWrapper'>
      {
        medicalCard.medicalNotes
          ? <div>
            <div className='tableHeader'>
              <span className='date'>Дата</span>
              <span className='type'>Тип</span>
              <span className='doctor'>Лікар</span>
            </div>
            <ul className='notes list-group'>
              {
                medicalCard.medicalNotes.map(note => {
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
    </div>
  }
}

MedicalCard.propTypes = {
  getMedicalCard: PropTypes.func,
  medicalCard: PropTypes.object
}

export default MedicalCard
