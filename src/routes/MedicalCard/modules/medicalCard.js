import axios from 'axios'
import {getCookie, getParsedDateTime} from '../../../utils'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SET_MEDICAL_NOTES = 'SET_MEDICAL_NOTES'

export const setMedicalNotes = (medicalNotes) => {
  return {
    type: SET_MEDICAL_NOTES,
    medicalNotes
  }
}

export const getMedicalCard = () => dispatch => {
  const ID = getCookie('userID')

  axios.get(`http://localhost:3001/medicalCard/patient/${ID}`)
    .then(data => {
      console.log(data.data)
      dispatch(setMedicalNotes(data.data.medicalNotes))
    })
}

export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    axios.post('http://localhost:3001/test', { id: 'test' })
      .then(data => {
        console.log(data)
      })
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().personalCabinet
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [SET_MEDICAL_NOTES] : (state, action) => {
    return {
      ...state,
      medicalNotes: action.medicalNotes.map(item => {
        return {
          ...item,
          date: getParsedDateTime(new Date(item.date))
        }
      })
    }
  }
}

const initialState = {}
export default function medicalCardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
