import React, { Component } from 'react'
import './Hospital.scss'

class Hospital extends Component {
  render () {
    return <div className='hospitalWrapper'>
      <h4 className='title'>Ліжковий фонд</h4>
      <div id='accordion'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>
              <button className='btn btn-link' data-toggle='collapse' data-target='#collapse-1'>
                <b>Палата #1</b>
              </button>
              <span className='balance right'>Зайнятість палати: 1/3</span>
            </h5>
          </div>

          <div id='collapse-1' className='collapse' data-parent='#accordion'>
            <div className='card-body'>
              <ul className='beds'>
                <li>
                  <span className='number left'>#1</span>
                  <span className='name left'>Антоновна В. Ю.</span>
                  <button className='btn right' />
                  <span className='until right'>До 23.05.2019</span>
                </li>
                <li className='free'>
                  <span className='number left'>#2</span>
                  <span className='name left'>Вільно</span>
                  <button className='btn right disabled' />
                  <span className='until right'>&mdash;</span>
                </li>
                <li>
                  <span className='number left'>#3</span>
                  <span className='name left'>Геронимівна І. В.</span>
                  <button className='btn right' />
                  <span className='until right'>&mdash;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>
              <button className='btn btn-link collapsed' data-toggle='collapse' data-target='#collapse-2'>
                <b>Палата #2</b>
              </button>
              <span className='balance right'>Зайнятість палати: 0/3</span>
            </h5>
          </div>
          <div id='collapse-2' className='collapse' data-parent='#accordion'>
            <div className='card-body'>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>
              <button className='btn btn-link collapsed' data-toggle='collapse' data-target='#collapse-3'>
                <b>Палата #3</b>
              </button>
              <span className='balance right'>Зайнятість палати: 3/4</span>
            </h5>
          </div>
          <div id='collapse-3' className='collapse' data-parent='#accordion'>
            <div className='card-body'>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

Hospital.propTypes = {
}

export default Hospital
