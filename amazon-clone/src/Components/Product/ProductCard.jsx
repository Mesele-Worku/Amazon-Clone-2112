import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function ProductCard({ product, flex, renderDesc, renderAddCart }) {
  const { title, image, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { title, image, id, rating, price, description },
    });
  };

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h4>{renderDesc ? title : truncate(title, 40)}</h4>
        {renderDesc && (
          <div style={{ maxWidth: "700px", marginBlock: "20px" }}>
            {description}
          </div>
        )}
        <div className="styles.rating">
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormatter amount={price} />
        </div>
        {renderAddCart && (
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
