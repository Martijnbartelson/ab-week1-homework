export const UPDATE_DELIVERY = 'UPDATE_DELIVERY'

export const updateDelivery = option => {
  return {
    type: UPDATE_DELIVERY,
    payload: option   
  }
}