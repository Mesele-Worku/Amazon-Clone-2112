import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [product, setPoduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setPoduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.products_container}>
          {product?.map((singleProduct) => (
            <ProductCard
              key={singleProduct.id}
              product={singleProduct}
              renderAddCart={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
