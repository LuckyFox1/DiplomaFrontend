import axios from 'axios'
import { getParsedDate } from '../../../utils'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SET_USER_LIST = 'SET_USER_LIST'
export const SET_MESSAGE = 'SET_MESSAGE'

export const setUserList = (userList) => {
  return {
    type: SET_USER_LIST,
    userList
  }
}

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    message
  }
}

export const searchUser = (searchStr, role) => (dispatch) => {
  axios.post(`http://localhost:3001/search`, { searchStr, role })
    .then(data => {
      const { users, success, message } = data.data

      if (success) {
        dispatch(setUserList(users))
        dispatch(setMessage(''))
      } else {
        dispatch(setUserList([]))
        dispatch(setMessage(message))
      }
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
  [SET_USER_LIST] : (state, action) => {
    return {
      ...state,
      users: action.userList.map(user => {
        return {
          ...user,
          dateOfBirth: getParsedDate(new Date(user.dateOfBirth))
        }
      })
    }
  },
  [SET_MESSAGE] : (state, action) => {
    return {
      ...state,
      message: action.message
    }
  }
}

const initialState = {}
export default function searchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
