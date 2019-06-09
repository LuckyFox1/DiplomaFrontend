import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './Search.scss'
import UserIconPlaceholder from '../assets/UserIconPlaceholder.jpg'
import { getCookie } from '../../../utils'

class Search extends Component {
  componentDidMount () {
    const { setUserList, setMessage } = this.props

    setUserList([])
    setMessage('')
  }

  handleSearchRequest = () => {
    const { searchUser } = this.props
    const role = getCookie('userRole') === 'patient' ? 'doctor' : 'patient'

    if (!this.searchInput.value.trim().length) {
      return false
    }

    searchUser(this.searchInput.value, role)
  }

  render () {
    const { search } = this.props
    const role = getCookie('userRole')

    return <div>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder={"Ім'я " + (role === 'patient' ? 'лікаря' : 'пацієнта')}
          ref={el => this.searchInput = el}
        />
        <div className='input-group-append'>
          <button
            className='btn btn-light'
            type='button'
            onClick={this.handleSearchRequest}
          >Пошук
          </button>
        </div>
      </div>
      <div className='searchResultsWrapper'>
        {
          search.users
            ? <ul className='searchResults'>
              {
                search.users.map(user => {
                  const { name, surname, patronymic, image, gender, dateOfBirth, position, roomNumber, userID } = user
                  const { day, month, year } = dateOfBirth

                  return <li key={userID}>
                    <div className='personalInfo'>
                      <div className='photoWrapper left'>
                        <div className='photo'>
                          {
                            !image
                              ? <img src={UserIconPlaceholder} alt='User photo' />
                              : <img src={image} alt='User photo' />
                          }
                        </div>
                      </div>
                      <div className='infoWrapper right'>
                        <h4 className='fullName'>{surname} {name} {patronymic}</h4>
                        <div className='info'>Стать: {gender}</div>
                        <div className='info'>Дата народження: {day}.{month}.{year}</div>
                        {
                          role === 'patient'
                            ? <div className='info'>Посада: {position}</div>
                            : <div>Телефон: {!user.phone ? 'Не вказано' : user.phone}</div>
                        }
                        {
                          role === 'patient'
                            ? <div className='info'>Кабінет: №{roomNumber}</div>
                            : <div>Адрес: {!user.address ? 'Не вказано' : user.address} </div>
                        }
                        <Link
                          className='btn btn-light'
                          to={role === 'patient' ? `/schedule/${userID}` : `/patient/${userID}`}
                        >
                          Перейти до профілю
                        </Link>
                      </div>
                    </div>
                  </li>
                })
              }
            </ul>
            : ''
        }
        { search.message && search.message.length && !search.users.length ? search.message : '' }
      </div>
    </div>

    /*
    return <div>
      <div className='input-group mb-3'>
        <input type='text' className='form-control' placeholder="Ім'я лікаря" />
        <div className='input-group-append'>
          <button className='btn btn-light' type='button'>Пошук</button>
        </div>
      </div>
      <div className='searchResultsWrapper'>
        <ul className='searchResults'>
          <li>
            <div className='personalInfo'>
              <div className='photoWrapper left'>
                <div className='photo'>
                  <img src={UserIconPlaceholder} alt='User photo' />
                </div>
              </div>
              <div className='infoWrapper right'>
                <h4 className='fullName'>Гнатюк Олександра Вікторівна</h4>
                <div className='info'>Стать: жіноча</div>
                <div className='info'>Дата народження: 25.01.1992</div>
                <div className='info'>Телефон: 0654783424</div>
                <div className='info'>Адреса: м. Черкаси, вул. Чехова, буд. 2</div>
                <button className='btn btn-light'>Переглянути графік</button>
              </div>
            </div>
          </li>
          <li>
            <div className='personalInfo'>
              <div className='photoWrapper left'>
                <div className='photo'>
                  <img src={UserIconPlaceholder} alt='User photo' />
                </div>
              </div>
              <div className='infoWrapper right'>
                <h4 className='fullName'>Гнатюченко Валентина Михайлівна</h4>
                <div className='info'>Стать: жіноча</div>
                <div className='info'>Дата народження: 02.03.1982</div>
                <div className='info'>Посада: завідуюча відділенням</div>
                <div className='info'>Кабінет: №2</div>
                <button className='btn btn-light'>Переглянути графік</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    */
  }
}

Search.propTypes = {
  searchUser: PropTypes.func,
  search: PropTypes.object,
  setUserList: PropTypes.func,
  setMessage: PropTypes.func
}

export default Search
