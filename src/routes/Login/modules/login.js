import axios from 'axios'
import { setCookie } from '../utils'

export const SET_USER = 'SET_USER'
export const SET_FORM_STATE = 'SET_FORM_STATE'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const setFormState = (success, message) => {
  return {
    type: SET_FORM_STATE,
    success,
    message
  }
}

export const loginUser = (login, password) => (dispatch) => {
  axios.post('http://localhost:3001/login', { login, password })
    .then(resp => {
      const { success, user, message } = resp.data

      if (success) {
        setCookie('userID', user.userID, 7)
        setCookie('userRole', user.role, 7)
        window.location.pathname = '/'
        /*
        dispatch(setUser(user))
        dispatch(setFormState(success, ''))
        */
      } else {
        dispatch(setFormState(success, message))
      }
    })
}

export const actions = {}

const ACTION_HANDLERS = {
  [SET_USER] : (state, action) => {
    return {
      ...state,
      user: action.user
    }
  },
  [SET_FORM_STATE]: (state, action) => {
    return {
      ...state,
      success: action.success,
      message: action.message
    }
  }
}

const initialState = {
  user: {},
  message: ''
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
