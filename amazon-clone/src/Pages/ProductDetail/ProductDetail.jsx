import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../API/Endpoints";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  console.log("Product ID from URL:", productId);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setIsLoading(false);
      });
  }, [productId]);

  if (!product) return <p>Loading...</p>; // Handle loading state

  return (
    <LayOut>
      {isLoading ? <Loader /> : <ProductCard product={product} />}
    </LayOut>
  );
}

export default ProductDetail;
