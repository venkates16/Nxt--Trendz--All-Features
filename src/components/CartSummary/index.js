// Write your code here

import './index.css'

const CartSummary = props => {
  const {obj} = props

  const getPrice = () => {
    const totalPrice = obj.reduce(
      (acc, each) => acc + each.price * each.quantity,
      0,
    )
    return totalPrice
  }

  const totalLenght = () => {
    const items = obj
    const len = items.length
    return len
  }

  return (
    <div className="cartPriceAlign">
      <div>
        <div className="alignOrder">
          <span> Order Total:</span>
          <h1 className="price">Rs: {getPrice()}</h1>
        </div>
        <p>{totalLenght()} Items in cart</p>
        <div>
          <button
            className="checkOutBtn"
            type="button"
            onClick={() =>
              confirm(
                'Venkates Will Implement Later this checkout Page and payment gateway',
              )
            }
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
