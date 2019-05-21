import { LOAD_SUCCESS, LOAD_ERROR, DELETE_BUTTON } from './actionTypes'

const defaultState = {
  buttons: [],
  name: '',
  description: '',
  error: '',
  loading: true
}

const handlers = {
  [LOAD_ERROR]: (state, { payload }) => ({
    ...defaultState,
    error: payload.error,
    loading: false
  }),
  [LOAD_SUCCESS]: (state, { payload }) => ({
    ...state,
    buttons: payload.buttons,
    name: payload.name,
    description: payload.description,
    loading: false
  }),
  [DELETE_BUTTON]: (state, { payload }) => ({
    ...state,
    buttons: state.buttons.filter(button => button.id !== payload.id)
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return state
  return handlers[action.type](state, action)
}
export default reducer
