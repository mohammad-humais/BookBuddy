import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookCover from "../../images/book_cover.jpg";
import { Api } from "../../utils/Api";
import { changeStatus,deleteBooks } from "../../utils/Endpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookCard = (props) => {
  console.log("props", props);
  const [bookTag, setBookTag] = useState({
    bookTag: props?.tag,
    bookId: props?._id 
  });

  const changeBookStatus = async () => {
    console.log("hello", bookTag);
    const { statusCode, data } = await Api.changeStatus(changeStatus, {
      bookTag: bookTag?.bookTag,
      bookId: bookTag?.bookId,
    });
    console.log('data',data)
    toast.success(`book status changed to ${data?.tag}`);

  };
  const deleteBook=async()=>{
    console.log("hello", bookTag);
    const { statusCode, data } = await Api.deleteBook(deleteBooks, {
      bookTag: bookTag?.bookTag,
      bookId: bookTag?.bookId,
    });
    console.log("statusCode", statusCode);
    toast.success("book has been deleted successfully");
  }
  return (
    <>
          {/* <ToastContainer /> */}
      <div className={`card products_card `}>
        <figure className={`products_img`} style={{ height: "180px" }}>
          <Link>
            <div>
              <img className="rounded-img" src={props?.image[0]} alt="" />
            </div>
          </Link>
        </figure>

        <div className="products_details">
          <h3 className="products_title">
            <Link>{props?.products?.productName}</Link>
          </h3>
          <h5 className="products_desc">
            <span style={{ fontWeight: "bolder" }}>Author: </span>{props?.description} 
          </h5>
          <div className="separator"></div>

          {props?.tag != "completed" ?
          <button
            type="button"
            className="btn products_btn"
            onClick={changeBookStatus} style={{"backgroundColor": "#007bff"}}
          >
            Change Status to {props?.tag ==="wishlist"?"Reading":
            "Completed"}
          </button>
           :""
          }
          <button
            type="button"
            className="btn products_btn"
            onClick={deleteBook}
          >
            Delete Book
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
