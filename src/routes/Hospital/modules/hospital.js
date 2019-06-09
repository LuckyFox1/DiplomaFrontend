import axios from 'axios'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SET_ROOMS = 'SET_ROOMS'

export const setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms
  }
}

export const fetchRoomsInfo = () => (dispatch) => {
  axios.get('http://localhost:3001/hospital/beds')
    .then(data => {
      const { rooms } = data.data

      dispatch(setRooms(rooms))
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

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [SET_ROOMS] : (state, action) => {
    return {
      ...state,
      rooms: action.rooms
    }
  }
}

const initialState = {}
export default function hospitalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
