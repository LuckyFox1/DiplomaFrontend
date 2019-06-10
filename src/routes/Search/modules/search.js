import axios from 'axios'
import { getParsedDate } from '../../../utils'
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

const ACTION_HANDLERS = {
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
