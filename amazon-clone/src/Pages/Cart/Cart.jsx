import React, { useContext } from "react";
import styles from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { Link } from "react-router-dom";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price + amount;
  }, 0);
  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Oops ! No items Found in Your Cart</p>
          ) : (
            basket?.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  product={item}
                  renderDesc={true}
                  renderAddCart={false}
                  flex={true}
                />
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}) items</p>
              <CurrencyFormatter amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <span>
              <Link to="/payments">Continue to Checkout</Link>
            </span>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
