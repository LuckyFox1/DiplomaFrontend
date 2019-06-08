import React, { Component } from 'react'
import './Register.scss'

class Register extends Component {
  componentDidMount() {
    $('#datepicker').datepicker();
  }

  render () {
    return <div className='register'>
      <form>
        <div className='form-group'>
          <label htmlFor='inputSurname'>Прізвище <span className='required'>*</span></label>
          <input type='text' className='form-control' id='inputSurname' placeholder='Прізвище' required />
        </div>
        <div className='form-group'>
          <label htmlFor='inputName'>Ім'я <span className='required'>*</span></label>
          <input type='text' className='form-control' id='inputName' placeholder="Ім'я" required />
        </div>
        <div className='form-group'>
          <label htmlFor='inputPatronymic'>По-батькові <span className='required'>*</span></label>
          <input type='text' className='form-control' id='inputPatronymic' placeholder='По-батькові' required />
        </div>
        <div className='form-group'>
          <label className='my-1 mr-2' htmlFor='selectGender'>Стать <span className='required'>*</span></label>
          <select className='custom-select my-1 mr-sm-2' id='selectGender' defaultValue='select' required>
            <option value='select'>Вибрати...</option>
            <option value='female'>Жіночий</option>
            <option value='male'>Чоловічий</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='datepicker'>Дата народження <span className='required'>*</span></label>
          <input type='text' className='form-control' id='datepicker' placeholder='Дата народження' />
        </div>
        <div className='form-group'>
          <label htmlFor='inputEmail'>Електронний адрес <span className='required'>*</span></label>
          <input type='email' className='form-control' id='inputEmail' placeholder='Електронний адрес' required />
        </div>
        <div className='form-group'>
          <label htmlFor='inputPassword'>Пароль <span className='required'>*</span></label>
          <input type='password' className='form-control' id='inputPassword' placeholder='Пароль' required />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Телефон</label>
          <input type='tel' className='form-control' id='phone' placeholder='Телефон' />
        </div>
        <div className='form-group'>
          <label htmlFor='inputAddress'>Адреса проживання</label>
          <input type='text' className='form-control' id='inputAddress' placeholder='Адреса проживання' />
        </div>
        <div className='requiredLabel'>* обов'язкове поле</div>
        <button type='submit' className='btn btn-primary registerBtn'>Зареєструватись</button>
      </form>
    </div>
  }
}

Register.propTypes = {}

export default Register
