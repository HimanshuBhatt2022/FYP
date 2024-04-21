import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("S");

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product?.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs {product?.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs {product?.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A jacket is generally lighter, tighter-fitting, and less insulating
          than a coat, which is outerwear.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div
              style={{
                backgroundColor: selectedSize === "S" ? "gray" : "",
                color: selectedSize === "S" ? "white" : "",
              }}
              onClick={() => setSelectedSize("S")}
            >
              S
            </div>
            <div
              style={{
                backgroundColor: selectedSize === "M" ? "gray" : "",
                color: selectedSize === "M" ? "white" : "",
              }}
              onClick={() => setSelectedSize("M")}
            >
              M
            </div>
            <div
              style={{
                backgroundColor: selectedSize === "L" ? "gray" : "",
                color: selectedSize === "L" ? "white" : "",
              }}
              onClick={() => setSelectedSize("L")}
            >
              L
            </div>
            <div
              style={{
                backgroundColor: selectedSize === "XL" ? "gray" : "",
                color: selectedSize === "XL" ? "white" : "",
              }}
              onClick={() => setSelectedSize("XL")}
            >
              XL
            </div>
            <div
              style={{
                backgroundColor: selectedSize === "XXL" ? "gray" : "",
                color: selectedSize === "XXL" ? "white" : "",
              }}
              onClick={() => setSelectedSize("XXL")}
            >
              XXL
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category: </span>Women, T-Shirt, Crop-Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
