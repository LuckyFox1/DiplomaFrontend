import axios from 'axios'
import { getCookie, getParsedDateTime } from '../../../utils'
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
      dispatch(setMedicalNotes(data.data.medicalNotes))
    })
}

const ACTION_HANDLERS = {
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
