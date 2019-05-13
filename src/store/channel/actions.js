import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_ERROR,
  SAVE_BUTTON,
  DELETE_BUTTON
} from './actionTypes'

export const load = payload => ({ type: LOAD, payload })
export const loadSuccess = payload => ({ type: LOAD_SUCCESS, payload })
export const loadError = payload => ({ type: LOAD_ERROR, payload })
export const saveButton = payload => ({ type: SAVE_BUTTON, payload })
export const deleteButton = payload => ({ type: DELETE_BUTTON, payload })
