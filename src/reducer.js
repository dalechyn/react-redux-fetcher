import { constants } from './constants'

export const reactFetcher = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_PENDING:
      return { status: action.type, suspender: action.suspender }
    case constants.FETCH_SUCCEED:
      return { status: action.type, result: action.result }
    case constants.FETCH_FAILED:
      return { status: action.type, error: action.error }
    default:
      return state
  }
}
