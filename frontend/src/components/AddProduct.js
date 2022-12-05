import React, { useState, useEffect } from "react";
import { Form, Field, Button, Select } from "react-form-package";

//axios
import axios from "axios";

import { useSelector } from "react-redux";

//styling
import "./AddProduct.css";

const AddArtProduct = () => {
  const [file, setFile] = useState({ preview: "", data: "" });

  const [loginUser, setItems] = useState([]);

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loginUser) {
      setItems(loginUser);
    }
  }, []);
  const handleSubmit = async (state) => {
    // let formData = new FormData()
    // formData.append = new FormData()
    // formData.append('file', image.data)
    // console.log(formData);
    // const response = await fetch('',{
    //     method: 'POST',
    //     body: formData,
    // })
    const newArtProduct = {
      ...state.data,
      artist: loginUser.id,
      file: file.data,

      //Lofin Id
    };

    console.log(newArtProduct);

    const addProduct = await axios.post(
      "http://localhost:8088/api/v1/artProduct/addNewProduct",
      newArtProduct
    );
    console.log(addProduct.data);
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };

  return (
    <div className="addProduct">
      <h1>Upload Product</h1>
      {file.preview && <img src={file.preview} width="100" height="100" />}
      <hr></hr>

      <Form validate>
        <div className="form__product">
          <h3>Product Name</h3>
          <Field
            className="textarea"
            type="text"
            id="productName"
            required
            placeholder="Product Title"
          />
          <br />
          <br />
          <h3>Product Description</h3>
          <Field
            rows="7"
            cols="50"
            type="textarea"
            id="productDesc"
            required
            placeholder="Product Description"
          />

          <br />
          <br />
          <h3>Price</h3>
          <Field type="number" id="price" required placeholder="0.00" />
          <br />
          <br />
          <h3>Category</h3>
          <Select id="category" type="select">
            <option disabled value="">
              --- Choose category ---
            </option>
            <option value="painting">Painting</option>
            <option value="pencil-drawing">Pencil Drawing</option>
            <option value="others">Others</option>
          </Select>
          <br />
          <br />

          {/* <Button
            id="submit"
            type="submit"
            onClick={(state) => {
              // alert(JSON.stringify(state, null, 2))
              // alert('open the console to see the whole state...')
              // console.log(state.data)
              handleSubmit(state);
            }}
          >
            submit
          </Button> */}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" onChange={handleFileChange}></input>
        </form>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
export default AddArtProduct;
