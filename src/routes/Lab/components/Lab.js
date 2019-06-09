import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Lab.scss'

class Lab extends Component {
  componentDidMount () {
    const { getLabsForms } = this.props

    getLabsForms()
  }

  render () {
    const { lab, toggleActiveForm } = this.props
    const activeAnalysis = lab.forms && Object.keys(lab.forms).find(form => {
      return lab.forms[form].active
    })
    console.log(activeAnalysis)

    return <div className='labWrapper'>
      <h4 className='title'>Редактор форм лабораторних досліджень</h4>
      {
        lab.forms
        ? <div className='contentEditor'>
            <div className='analysisListWrapper left'>
              <ul className='list-group analysisList'>
                {
                  Object.keys(lab.forms).map(form => {
                    return <li
                      key={form}
                      className={`list-group-item rounded-0 ${lab.forms[form].active ? 'active' : ''}`}
                      onClick={() => toggleActiveForm(form)}
                    >
                      {lab.forms[form].title}
                    </li>
                  })
                }
              </ul>
              <button className='btn btn-light create'>Створити форму</button>
            </div>
            {
              activeAnalysis
              ? <div className='analysis right'>
                  <div className='tableHeader'>
                    <span className='property'>Властивість</span>
                    <span className='normValues'>Референтні значення</span>
                  </div>
                  <ul className='list-group propertiesList'>
                    {
                      lab.forms[activeAnalysis].properties.map(prop => {
                        const { min, max, norm } = prop
                        const units = prop.units ? prop.units : ''

                        return <li className='list-group-item rounded-0'>
                          <span className='property'>{prop.propertyTitle}</span>
                          <span className='normValues'>
                            { norm ? `${norm} ${units}` : `${min} - ${max} ${units}` }
                          </span>
                        </li>
                      })
                    }
                  </ul>
                <button className='btn btn-light edit'>Редагувати</button>
                <button className='btn btn-light remove'>Видалити</button>
              </div> : ''
            }
        </div> : ''
      }
    </div>
  }
}

Lab.propTypes = {
  getLabsForms: PropTypes.func,
  lab: PropTypes.object,
  toggleActiveForm: PropTypes.func
}

export default Lab
