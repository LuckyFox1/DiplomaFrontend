import axios from 'axios'
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SET_LABS_FORMS = 'SET_LABS_FORMS'
export const TOGGLE_ACTIVE_FORM = 'TOGGLE_ACTIVE_FORM'

export const toggleActiveForm = (formID) => {
  return {
    type: TOGGLE_ACTIVE_FORM,
    formID
  }
}

export const setLabsForms = (labs) => {
  return {
    type: SET_LABS_FORMS,
    labs
  }
}

export const getLabsForms = () => (dispatch) => {
  axios.get('http://localhost:3001/labs')
    .then(res => {
      const { labs } = res.data

      dispatch(setLabsForms(labs))
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
  [SET_LABS_FORMS] : (state, action) => {
    return {
      ...state,
      forms: action.labs
    }
  },
  [TOGGLE_ACTIVE_FORM] : (state, action) => {
    let newForms = {}

    Object.keys(state.forms).forEach(form => {
      const formObj = state.forms[form]

      if (form === action.formID) {
        newForms[form] = { ...formObj, active: !formObj.active }
      } else {
        newForms[form] = { ...formObj, active: false }
      }
    })

    return {
      ...state,
      forms: newForms
    }
  }
}

const initialState = {}
export default function labReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
