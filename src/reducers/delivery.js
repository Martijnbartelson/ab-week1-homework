import { UPDATE_DELIVERY } from '../actions/delivery'

const reducer = (state = 'standard', action ) => {
  switch(action.type) {
  case UPDATE_DELIVERY:
    return action.payload
  default:
    return state
  }
}

export default reducer
