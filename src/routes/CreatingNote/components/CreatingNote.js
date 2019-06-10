import React, { Component } from 'react'
import './CreatingNote.scss'
import {Link} from "react-router";

class CreatingNote extends Component {
  componentDidMount () {
  }

  render () {
    return <div className='creatingNoteWrapper'>
      <h4 className='title'>Створення нового запису</h4>
      <div className={'contentWrapper'}>
        <div className={'typesWrapper'}>
          <ul className={'list-group types'}>
            <li className={'list-group-item rounded-0'}>
              <Link className={'type'} to={'#'}>Консультація</Link>
            </li>
            <li className={'list-group-item rounded-0'}>
              <Link className={'type'} to={'#'}>Результати лабораторних досліджень</Link>
            </li>
            <li className={'list-group-item rounded-0'}>
              <Link className={'type'} to={'#'}>Картка госпіталізованого хворого</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  }
}

CreatingNote.propTypes = {}

export default CreatingNote
