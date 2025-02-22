import React, { useContext } from "react";
import styles from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };
  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };
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
                <section className={styles.cart_product}>
                  <ProductCard
                    key={index}
                    product={item}
                    renderDesc={true}
                    renderAddCart={false}
                    flex={true}
                  />
                  <div className={styles.btn_container}>
                    <button onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
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
