import { combineReducers } from 'redux'
import options from './options'
import delivery from './delivery'
import selectedPizzas from './selectedPizzas'

export default combineReducers({
  options, selectedPizzas, delivery
})
