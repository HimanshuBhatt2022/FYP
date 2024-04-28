import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios"
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };


  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    // sending the form data to api
    try {
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          // 'Content-Type':'application/json',
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
          console.log(data);
        });

      if (responseData.success) {
        product.image = responseData.image_url;
        // await fetch("http://localhost:4000/addproduct", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application",
        //   },
        //   // product data is in json format ,converting to string type
        //   body: JSON.stringify(product),
        // })
        //   .then((resp) => resp.json())
        //   .then((data) => {
        //     data.success ? alert("Product Added") : alert("failed");
        //   });

        await axios.post("http://localhost:4000/addproduct",product)
        .then((res)=>console.log(res))
        .catch(err=>console.log(err))
      }
    } catch (error) {
      console.log("here is error --", error);
    }
  };

  return (
    <div className="add_product">
      <div className="addproduct-itemfield">
        <p>Product tittle</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>

        <div className="addproduct-itemfield">
          <p> Offer price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
      
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
          placeholder="select category"
        >
          <option value="women"  >Women</option>
          <option value="men"  >Men</option>
          <option value="kid"  >Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product()
          toast.success("Product Added Succesfully !!")
        }}
        className="addproduct-btn"
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;
