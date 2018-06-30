import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import uid from 'uid'
import {addPizza,deletePizza} from '../actions/pizzas'
import {updateDelivery} from '../actions/delivery'
import {StyledList, StyledForm, ListItem, Span, H3, H4, Input, Label, Order, Total, Button} from './StyledComponents'

class OrderContainer extends PureComponent {
  state = { delivery: 'standard'}

  addPizza = () => {
    const pizza = {
      id: uid(),
      base: '35cm',
      sauces: 'red',
      toppings: []
    }
    this.props.addPizza(pizza)
    this.props.setActivePizza(pizza.id)
  }

  deletePizza = id => this.props.deletePizza(id)

  handleRadioChange = e => {                  
    this.props.updateDelivery(e.currentTarget.value)
    this.setState({delivery:e.currentTarget.value})
  }

  getPrice = id => {
    const { selectedPizzas, options} = this.props
    let pizza = selectedPizzas.find(pizza => pizza.id === id)   
    let basePrice = pizza.base ? options.base.find(option => pizza.base === option.size).price : 0
    let saucePrice = pizza.sauces ? options.sauces.find(option => pizza.sauces === option.type).price : 0
    let toppingsPrice = pizza.toppings.length * 0.5
    return basePrice + saucePrice + toppingsPrice
  }

  getTotalPrice = () => {
    const { options, delivery} = this.props
    let multiplier = options.delivery.find(option => delivery === option.type).multiplier
    let price = this.props.selectedPizzas
      .map(pizza => this.getPrice(pizza.id))
      .reduce((acc=0, cur) => acc + cur)
    return price * multiplier
  }  

  render() {
    const { selectedPizzas, options } = this.props
    const totalPrice = this.getTotalPrice()
    return (
      <Order>
        <H3>Order</H3>
        <StyledList>
          { selectedPizzas.map(pizza => <ListItem key={pizza.id}>
            <Span>  1x {pizza.base} €{this.getPrice(pizza.id).toFixed(2)}</Span>
            { selectedPizzas.length > 1 && <Button color={'white'} text={'#333'} onClick={()=>this.props.setActivePizza(pizza.id)}>Edit</Button> }
            { selectedPizzas.length > 1 && <Button color={'white'} text={'#333'} onClick={()=>this.deletePizza(pizza.id)}>X</Button> }
          </ListItem>) }
          <Button color={'#009a50'} text={'white'} onClick={this.addPizza}>Add pizza</Button>
        </StyledList>
        <StyledForm>
          <H4>Delivery</H4>
          {options.delivery.map( option => <Label key={option.id}>
            <Input type="radio" name='delivery' 
              value={option.type} 
              onChange={this.handleRadioChange}
              checked={option.type===this.props.delivery}>
            </Input>{option.type}<br></br></Label>)}  
        </StyledForm>
        <Total>Total €{ totalPrice.toFixed(2) }</Total>
      </Order>  
    )
  }
}

const mapStateToProps = function (state) {
  return {
    selectedPizzas: state.selectedPizzas,
    options: state.options,
    delivery: state.delivery
  }
}

export default connect(mapStateToProps,{addPizza,deletePizza,updateDelivery})(OrderContainer)
