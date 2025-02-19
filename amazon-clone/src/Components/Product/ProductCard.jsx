import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
function ProductCard({ product, flex, renderDesc }) {
  const { title, image, id, rating, price, description } = product;
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
        <h3>{renderDesc ? title : truncate(title, 45)}</h3>
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
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
