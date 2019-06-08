import axios from 'axios'
import { getParsedDate, getParsedTime, getReceptions } from '../../../utils'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
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
          payload : getState().register
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
