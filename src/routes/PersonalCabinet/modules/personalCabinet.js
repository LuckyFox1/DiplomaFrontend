import axios from 'axios'
import { getCookie, getParsedDateTime, getParsedDate } from '../../../utils'

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
  const userRole = getCookie('userRole')
  axios.get(`http://localhost:3001/personalCabinet/${userRole}/${userID}`)
    .then(data => {
      const { receptions, user } = data.data

      dispatch(setUser(user))
      dispatch(setReceptions(receptions))
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
  [SET_RECEPTIONS]: (state, action) => {
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

const initialState = {}
export default function personalCabinetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
