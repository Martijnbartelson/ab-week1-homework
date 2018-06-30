import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Wrapper, StyledSection, StyledForm, Pizza, Price, Input, Label, H3, H4} from './StyledComponents'
import OrderContainer from './OrderContainer'
import {updatePizza} from '../actions/pizzas'

class PizzaContainer extends PureComponent {
  state = { activePizza: null}

  componentDidMount() { 
    this.setActivePizza(this.props.selectedPizzas[0].id) 
  }

  componentDidUpdate(prevProps) {
    let { activePizza } = this.state
    let { selectedPizzas } = this.props
    if (selectedPizzas !== prevProps.selectedPizzas && selectedPizzas.length === prevProps.selectedPizzas.length) {
      const index = selectedPizzas.findIndex(pizza=> pizza.id === activePizza.id);
      this.setActivePizza(selectedPizzas[index].id) 
    }
    if (selectedPizzas.length !== prevProps.selectedPizzas.length) {
      this.setActivePizza(selectedPizzas[selectedPizzas.length-1].id) 
    }
  }

  setActivePizza = id => {
    let activePizza = this.props.selectedPizzas.find(pizza=> pizza.id === id)
    this.setState({activePizza})
  }

  handleRadioChange = e => {
    let activePizza = Object.assign({}, this.state.activePizza);    
    activePizza[e.currentTarget.name] = e.currentTarget.value;                        
    this.setState({activePizza});
    this.props.updatePizza(activePizza)
  }

  handleCheckboxChange = e => {
    let activePizza = Object.assign({}, this.state.activePizza); 
    const index = activePizza.toppings.indexOf(e.currentTarget.value);
    e.currentTarget.checked && activePizza.toppings.push(e.currentTarget.value)
    !e.currentTarget.checked && activePizza.toppings.splice(index, 1)                       
    this.setState({activePizza});
    this.props.updatePizza(activePizza)
  }

  render() {
    const { options } = this.props
    const { activePizza } = this.state

    if(!activePizza) { return 'loading'}
    return (
      <Wrapper>
        <StyledSection width={1}>
          <H3>Customize your pizza</H3>
          <StyledForm>
            <H4>Base</H4>
            {options.base.map( variant => <Label key={variant.id}>
              <Input type="radio" name='base' 
                value={variant.size}
                onChange={this.handleRadioChange} 
                checked={variant.size===activePizza.base}>
              </Input>{variant.size} <Price>(€{variant.price.toFixed(2)})</Price></Label>) }
          </StyledForm>  
          <StyledForm>
            <H4>Sauces</H4>
            {options.sauces.map( sauce => <Label key={sauce.id}>
              <Input type="radio" name='sauces' 
                value={sauce.type} 
                onChange={this.handleRadioChange} 
                checked={sauce.type===activePizza.sauces}>
              </Input>{sauce.type} <Price>(€{sauce.price.toFixed(2)})</Price></Label>)}  
          </StyledForm>
          <StyledForm>
            <H4>Toppings <Price>(max 3 x €0,50)</Price></H4>
            {options.toppings.map( topping => <Label key={topping.id}>
              <Input type="checkbox" name='toppings' 
                value={topping.type}
                onChange={this.handleCheckboxChange} 
                disabled={activePizza.toppings.length>=3 && !activePizza.toppings.includes(topping.type)} 
                checked={activePizza.toppings.includes(topping.type)}>
              </Input>{topping.type}</Label>)}  
          </StyledForm>
        </StyledSection>
        <StyledSection width={2}>
          <Pizza base={activePizza.base}>
            { activePizza.toppings.map(topping=><img src={require(`../img/${topping}.png`)} alt="topping" className='pizzaTopping'/>)}
            <img src={require('../img/pizza_base.png')} alt="pizza" className='pizzaImg'/>
          </Pizza>  
        </StyledSection>
        <StyledSection width={1}>
          <OrderContainer setActivePizza={this.setActivePizza} activePizza={activePizza}/>
        </StyledSection >
      </Wrapper>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    options: state.options,
    selectedPizzas: state.selectedPizzas,
  }
}

export default connect(mapStateToProps,{updatePizza})(PizzaContainer)
