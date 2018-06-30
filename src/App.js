import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import PizzaContainer from './components/PizzaContainer'
import {StyledApp, Logo, Img} from './components/StyledComponents'

class App extends Component {
  render() {
    return (
      <StyledApp>
        <header>
          <Logo>
            <Img src={require('./img/logo.png')} alt="logo"/>
          </Logo>
        </header>
        <main>
          <Route exact path="/pizza" component={PizzaContainer} />
          <Route exact path="/" render={ () => <Redirect to="/pizza" /> } />
        </main>
      </StyledApp>
    );
  }
}

export default App;
