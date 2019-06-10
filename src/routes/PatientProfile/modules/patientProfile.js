import axios from 'axios'
import { getParsedDateTime, getParsedDate } from '../../../utils'

export const SET_USER = 'SET_USER'
export const SET_NOTES = 'SET_NOTES'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const setNotes = (medicalNotes) => {
  return {
    type: SET_NOTES,
    medicalNotes
  }
}

export const fetchPatientProfileInfo = (id) => (dispatch) => {
  axios.get(`http://localhost:3001/profile/patient/${id}`)
    .then(data => {
      const { medicalNotes, user } = data.data

      dispatch(setUser(user))
      dispatch(setNotes(medicalNotes))
    })
}

const ACTION_HANDLERS = {
  [SET_USER]: (state, action) => {
    const date = new Date(action.user.dateOfBirth)

    return {
      ...state,
      user: {
        ...action.user,
        dateOfBirth: getParsedDate(date)
      }
    }
  },
  [SET_NOTES] : (state, action) => {
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
export default function patientProfileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
