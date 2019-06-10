import axios from 'axios'
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

const ACTION_HANDLERS = {
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
