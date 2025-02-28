import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const handleChange = (e) => {
    // console.log(e.error.message);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // 1. Contact Backend function to get client secret code (key)
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. Client Side (React side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // After Confirmation Save the orders on firestore database and clear baskets
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have Placed a new Order" } });
    } catch (error) {
      console.log("Error", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={styles.payment_header}>Checkout ({totalItem}) items</div>
      <hr />
      <section className={styles.payment}>
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div> {user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={styles.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item, index) => {
              return <ProductCard key={index} product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />
        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              {cardError && (
                <small style={{ color: "red", alignItems: "center" }}>
                  {cardError}
                </small>
              )}
              <form onSubmit={handlePayment}>
                <CardElement onChange={handleChange} />
                <div className={styles.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormatter amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
