export const ADD_PIZZA = 'ADD_PIZZA'
export const DELETE_PIZZA = 'DELETE_PIZZA'
export const UPDATE_PIZZA = 'UPDATE_PIZZA'

export const addPizza = pizza => {
  return {
    type: ADD_PIZZA,
    payload: pizza    
  }
}

export const deletePizza = id => {
  return {
    type: DELETE_PIZZA,
    payload: id    
  }
}

export const updatePizza = pizza => {
  return {
    type: UPDATE_PIZZA,
    payload: pizza   
  }
}