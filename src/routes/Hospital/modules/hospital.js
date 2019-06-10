import axios from 'axios'
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

const ACTION_HANDLERS = {
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
