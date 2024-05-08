import React, { useState } from "react";
import "./UpdateProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../utils/Api";
import { addBook } from "../utils/Endpoint";
import { useNavigate } from "react-router-dom";
const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleImageChange = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("bookData", bookData);
    const { title, description, image } = bookData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // const { statusCode, data } = await Api.addBook(addBook, { formData });
    const { statusCode, data } = await Api.addBook(addBook, formData);

    console.log("data", data);
    console.log("statusCode", statusCode);
    if (statusCode === true) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="update-profile-page">
        <div className="gray-section">
          <h2 className="update-profile-heading">Add Book</h2>
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label" htmlFor="title">
                Book Title
              </label>
              <input
                className="form-input"
                type="text"
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                placeholder="Enter book title"
              />
            </div>
            <div className="form-row name-fields">
              <label className="form-label" htmlFor="author">
                Book Author
              </label>
              <input
                className="form-input"
                type="text"
                id="description"
                name="description"
                value={bookData.description}
                onChange={handleChange}
                placeholder="Enter book author name"
              />
            </div>
            <div className="form-row">
              <label className="form-label" htmlFor="image">
                Upload Image
              </label>
              <input
                className="form-input"
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <button type="submit" className="submit-button">
              Add Book
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddBook;
