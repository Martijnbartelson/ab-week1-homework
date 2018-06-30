import { ADD_PIZZA, DELETE_PIZZA, UPDATE_PIZZA } from '../actions/pizzas'
import uid from 'uid'

const initialState = [
  {
    id: uid(),
    base: '35cm',
    sauces: 'red',
    toppings: []
  },
]

const reducer = (state = initialState, action ) => {
  switch(action.type) {
  case ADD_PIZZA:
    return [ ...state, action.payload ]
  case DELETE_PIZZA:
    return state.filter(pizza => pizza.id !== action.payload)
  case UPDATE_PIZZA:
    let updatedPizza = action.payload
    return state.map(pizza=>{
      if(pizza.id === updatedPizza.id) {
        return updatedPizza
      } else { return pizza }
    })
  default:
    return state
  }
}

export default reducer
