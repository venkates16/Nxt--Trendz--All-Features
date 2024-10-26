import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import CartSummary from '../CartSummary'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      return (
        <div className="cartListContainer">
          <div className="cardBtnRemove">
            {' '}
            <button className="btnRemove" onClick={removeAllCartItems}>
              Remove all
            </button>
          </div>

          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>

          <div>
            <CartSummary obj={cartList} />
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
