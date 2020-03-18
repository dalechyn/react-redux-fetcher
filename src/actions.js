import { constants } from './constants'

export const wrapAsyncAction = asyncAction => actionArgs => (dispatch, getState) => {
  const pending = suspender => ({ type: constants.FETCH_PENDING, suspender })
  const success = result => ({ type: constants.FETCH_SUCCEED, result })
  const error = error => ({ type: constants.FETCH_FAILED, error })

  dispatch(
    pending(
      dispatch(asyncAction(actionArgs)).then(
        r => dispatch(success(r)),
        e => dispatch(error(e))
      )
    )
  )

  return {
    read() {
      const { reactFetcher } = getState()
      switch (reactFetcher.status) {
        case constants.FETCH_PENDING:
          throw reactFetcher.suspender
        case constants.FETCH_SUCCEED:
          return reactFetcher.result
        case constants.FETCH_FAILED:
          throw error
        default:
          return reactFetcher
      }
    }
  }
}
