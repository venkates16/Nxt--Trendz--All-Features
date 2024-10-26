import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const obj = cartList.find(each => {
      if (each.id === product.id) {
        return 1
      }
      return null
    })

    if (obj) {
      //   updateding existing cart item with new updated quantity
      const newArray = cartList.map(each => {
        if (each.id === product.id) {
          return {...each, quantity: product.quantity}
        }
        return each
      })
      this.setState({cartList: newArray})
    } else {
      //    updating new product

      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    //  console.log('hii')
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateNewWithQuantity = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }

      return each
    })
    this.setState({
      cartList: updateNewWithQuantity,
    })
  }

  decrementCartItemQuantity = id => {
    // console.log(id)
    const {cartList} = this.state
    const updatedArray = cartList.map(each => {
      if (each.quantity > 1) {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
      }
      return each
    })
    this.setState({
      cartList: updatedArray,
    })
  }

  removeCartItem = uniquId => {
    const {cartList} = this.state
    const updatedArry = cartList.filter(each => each.id !== uniquId)
    this.setState({cartList: updatedArry})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
