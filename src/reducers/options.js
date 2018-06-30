
const initialState = {
  base: [
    { id: 1, size: '20cm', price: 6.45 },
    { id: 2, size: '25cm', price: 8.99 },
    { id: 3, size: '30cm', price: 11.49 },
    { id: 4, size: '35cm', price: 13.49 },
  ],
  sauces: [
    { id: 2, type: 'red', price: 0.00 },
    { id: 1, type: 'white', price: 0.00 },
    { id: 3, type: 'double red', price: 1.00 },
    { id: 4, type: 'mix it up', price: 1.50 },
  ],
  toppings: [
    { id: 1, type: 'pineapple', price: 0.50 },
    { id: 2, type: 'corn', price: 0.50 },
    { id: 3, type: 'olives', price: 0.50 },
    { id: 4, type: 'onion', price: 0.50 },
    { id: 5, type: 'spinach', price: 0.50 },
    { id: 6, type: 'tomatoes', price: 0.50 },
    { id: 7, type: 'chicken', price: 0.50 },
  ],
  delivery: [
    { id: 1, type: 'standard', multiplier: 1.0 },
    { id: 2, type: 'turbo-drone (+10%)', multiplier: 1.1 },
  ]
}

const reducer = (state = initialState, action ) => {
  switch(action.type) {
  default:
    return state
  }
}

export default reducer
