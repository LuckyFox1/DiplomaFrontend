import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Hospital.scss'

class Hospital extends Component {
  componentDidMount () {
    const { fetchRoomsInfo } = this.props

    fetchRoomsInfo()
  }

  render () {
    const { hospital } = this.props

    return <div className='hospitalWrapper'>
      <h4 className='title'>Ліжковий фонд</h4>
      {
        hospital.rooms
        ? <div id='accordion'>
            {
              Object.keys(hospital.rooms).map(room => {
                let amount = 0

                hospital.rooms[room].forEach(bed => {
                  if (bed.userID) {
                    amount += 1
                  }
                })
                return <div key={room} className='card'>
                  <div className='card-header'>
                    <h5 className='mb-0'>
                      <button className='btn btn-link' data-toggle='collapse' data-target={`#collapse-${room}`}>
                        <b>Палата #{room}</b>
                      </button>
                      <span className='balance right'>Зайнятість палати: {amount}/{hospital.rooms[room].length}</span>
                    </h5>
                  </div>
                  <div id={`collapse-${room}`} className='collapse' data-parent='#accordion'>
                    <div className='card-body'>
                      <ul className='beds'>
                        {
                          hospital.rooms[room].map(bed => {
                            return <li key={bed.number} className={bed.userID ? '' : 'free'}>
                              <span className='number left'>#{bed.number}</span>
                              <span className='name left'>
                                { bed.userID ? `${bed.surname} ${bed.name[0]}. ${bed.patronymic[0]}.` : 'Вільно' }
                              </span>
                              {
                                bed.userID
                                ? <button className='btn right edit-btn' />
                                : <button className='btn right edit-btn disabled' />
                              }
                              <span className='until right'>
                                { bed.hospitalizationTerm ? `До ${bed.hospitalizationTerm}` : <span>&mdash;</span> }
                              </span>
                            </li>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              })
            }
        </div> : ''
      }
    </div>
  }
}

Hospital.propTypes = {
  fetchRoomsInfo: PropTypes.func,
  hospital: PropTypes.object
}

export default Hospital
