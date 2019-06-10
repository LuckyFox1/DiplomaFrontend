import axios from 'axios'
import { getParsedDate, getParsedTime, getReceptions } from '../../../utils'
export const SET_DOCTOR = 'SET_DOCTOR'
export const TOGGLE_SCHEDULE = 'TOGGLE_SCHEDULE'
export const SET_RECEPTIONS = 'SET_RECEPTIONS'

export const setReceptions = (receptions) => {
  return {
    type: SET_RECEPTIONS,
    receptions
  }
}

export const setDoctor = (user) => {
  return {
    type: SET_DOCTOR,
    user
  }
}

export const toggleSchedule = (scheduleIsOpened) => {
  return {
    type: TOGGLE_SCHEDULE,
    scheduleIsOpened
  }
}

export const fetchDoctorSchedule = (doctorID) => (dispatch) => {
  axios.get(`http://localhost:3001/schedule/doctor/${doctorID}`)
    .then(data => {
      const { user } = data.data
      const receptions =
        getReceptions(getParsedTime(user.startWorkDay), getParsedTime(user.endWorkDay), getParsedTime(user.startDinner),
          getParsedTime(user.endDinner), user.receptionDuration)

      dispatch(setDoctor(user))
      dispatch(setReceptions(receptions))
    })
}

const ACTION_HANDLERS = {
  [SET_DOCTOR] : (state, action) => {
    return {
      ...state,
      user: {
        ...action.user,
        dateOfBirth: getParsedDate(new Date(action.user.dateOfBirth)),
        startWorkDay: getParsedTime(action.user.startWorkDay),
        endWorkDay: getParsedTime(action.user.endWorkDay),
        startDinner: getParsedTime(action.user.startDinner),
        endDinner: getParsedTime(action.user.endDinner)
      }
    }
  },
  [TOGGLE_SCHEDULE] : (state, action) => {
    return {
      ...state,
      scheduleIsOpened: action.scheduleIsOpened
    }
  },
  [SET_RECEPTIONS] : (state, action) => {
    return {
      ...state,
      receptions: action.receptions
    }
  }
}

const initialState = {}
export default function registerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
