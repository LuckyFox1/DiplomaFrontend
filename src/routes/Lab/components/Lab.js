import React, { Component } from 'react'
import './Lab.scss'

class Lab extends Component {
  render () {
    return <div className='labWrapper'>
      <h4 className='title'>Редактор форм лабораторних досліджень</h4>
      <div className='contentEditor'>
        <div className='analysisListWrapper left'>
          <ul className='list-group analysisList'>
            <li className='list-group-item rounded-0'>Мазок на флору</li>
            <li className='list-group-item rounded-0 active'>Аналіз на гормони</li>
            <li className='list-group-item rounded-0'>Біохімічний аналіз крові</li>
            <li className='list-group-item rounded-0'>Загальний аналіз крові</li>
          </ul>
          <button className='btn btn-light create'>Створити форму</button>
        </div>
        <div className='analysis right'>
          <div className='tableHeader'>
            <span className='property'>Властивість</span>
            <span className='normValues'>Референтні значення</span>
          </div>
          <ul className='list-group propertiesList'>
            <li className='list-group-item rounded-0'>
              <span className='property'>T3 вільний</span>
              <span className='normValues'>2.38 - 4.37</span>
            </li>
            <li className='list-group-item rounded-0'>
              <span className='property'>T4 вільний</span>
              <span className='normValues'>0.80 - 2.10</span>
            </li>
            <li className='list-group-item rounded-0'>
              <span className='property'>ТТГ (тіротропін)</span>
              <span className='normValues'>0.27 - 4.2</span>
            </li>
          </ul>
          <button className='btn btn-light edit'>Редагувати</button>
          <button className='btn btn-light remove'>Видалити</button>
        </div>
      </div>
    </div>
  }
}

Lab.propTypes = {
}

export default Lab
