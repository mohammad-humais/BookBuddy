// import React, { useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";
// const QuantityBox = (props) => {
//   const { itemQuantity } = props;
//   const [quantity, setQuantity] = useState(itemQuantity);
//   const incrementItem = (itemQuantity) => {
//     setQuantity((itemQuantity) => itemQuantity + 1); // Update the quantity state
//   };
//   const decrementItem = (itemQuantity) => {
//     setQuantity((itemQuantity) => itemQuantity - 1); // Update the quantity state
//   };
//   return (
//     <>
//       <div className="quantity_box">
//         <button
//           type="button"
//           onClick={() => decrementItem(itemQuantity)}
//           disabled={quantity <= 1}
//         >
//           <FaMinus />
//         </button>
//         <span className="quantity_count">{quantity}</span>
//         <button
//           type="button"
//           onClick={() => incrementItem(itemQuantity)}
//           disabled={quantity >= 5}
//         >
//           <FaPlus />
//         </button>
//       </div>
//     </>
//   );
// };

// export default QuantityBox;
