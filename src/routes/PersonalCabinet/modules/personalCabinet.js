import axios from 'axios'
import { getCookie, getParsedDateTime, getParsedDate } from '../../../utils'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SET_USER = 'SET_USER'
export const SET_RECEPTIONS = 'SET_RECEPTIONS'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const setReceptions = (receptions) => {
  return {
    type: SET_RECEPTIONS,
    receptions
  }
}

export const fetchPersonalCabinetInfo = () => (dispatch) => {
  const userID = getCookie('userID')
  axios.get(`http://localhost:3001/personalCabinet/patient/${userID}`)
    .then(data => {
      console.log(data.data)
      const { receptions, user } = data.data

      dispatch(setUser(user))
      dispatch(setReceptions(receptions))
    })
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
  doubleAsync
}

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [SET_USER] : (state, action) => {
    const date = new Date(action.user.dateOfBirth)

    return {
      ...state,
      user: {
        ...action.user,
        dateOfBirth: getParsedDate(date)
      }
    }
  },
  [SET_RECEPTIONS] : (state, action) => {
    return {
      ...state,
      receptions: action.receptions.map((item) => {
        const dateEndReception = new Date(item.endReception)
        const dateStartReception = new Date(item.startReception)

        return {
          ...item,
          endReception: getParsedDateTime(dateEndReception),
          startReception: getParsedDateTime(dateStartReception)
        }
      })
    }
  }
}

const initialState = {
}
export default function personalCabinetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
